"use strict";

const navLink = document.querySelectorAll(".nav-link");
const appSection = document.querySelectorAll(".app-section");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

const apodTitle = document.getElementById("apod-title");
const apodImage = document.getElementById("apod-image");
const apodCopyright = document.getElementById("apod-copyright");
const apodExplanation = document.getElementById("apod-explanation");
const apodDate = document.getElementById("apod-date-detail");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");
const fullResolution = document.getElementById("fullResolution");

const apodDateInput = document.getElementById("apod-date-input");
const apodDateSpan = document.getElementById("apod-date-span");
const loadDateBtn = document.getElementById("load-date-btn");
const todayApodBtn = document.getElementById("today-apod-btn");

const launchesGrid = document.getElementById("launches-grid");
const featuredLaunch = document.getElementById("featured-launch");
const loader = document.getElementById("apod-loading");

const planetsGrid = document.getElementById("planets-grid");
const planetName = document.getElementById("planet-detail-name");
const planetImage = document.getElementById("planet-detail-image");
const planetDescription = document.getElementById("planet-detail-description");
const planetDistance = document.getElementById("planet-distance");
const planetRadius = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetPeriod = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");
const planetDiscoverer = document.getElementById("planet-discoverer");
const planetDiscovererDate = document.getElementById("planet-discovery-date");
const planetVolume = document.getElementById("planet-volume");
const planetFacts = document.getElementById("planet-facts");
const planetPerihelion = document.getElementById("planet-perihelion");
const planetAphelion = document.getElementById("planet-aphelion");
const planetEccentricity = document.getElementById("planet-eccentricity");
const planetInclination = document.getElementById("planet-inclination");
const planetAxialTilt = document.getElementById("planet-axial-tilt");
const planetTemp = document.getElementById("planet-temp");
const planetEscape = document.getElementById("planet-escape");

for (let i = 0; i < navLink.length; i++) {
  navLink[i].addEventListener("click", (e) => {
    e.preventDefault();
    const dataSection = navLink[i].getAttribute("data-section");

    for (let n = 0; n < navLink.length; n++) {
      navLink[n].classList.remove("bg-blue-500/10", "text-blue-400");
      navLink[n].classList.add("text-slate-300", "hover:bg-slate-800");
    }
    navLink[i].classList.remove("text-slate-300", "hover:bg-slate-800");
    navLink[i].classList.add("bg-blue-500/10", "text-blue-400");

    for (let i = 0; i < appSection.length; i++) {
      const dataAppSection = appSection[i].getAttribute("data-section");
      if (dataSection == dataAppSection) {
        appSection[i].classList.remove("hidden");
      } else {
        appSection[i].classList.add("hidden");
      }
    }
  });
}

sidebarToggle.addEventListener("click", (e) => {
  sidebar.classList.add("show");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (sidebar.contains(e.target)) return;
  sidebar.classList.remove("show");
});

loadDateBtn.addEventListener("click", () => {
  const selectedDate = apodDateInput.value;

  if (!selectedDate) return;

  getToday(selectedDate);
});

todayApodBtn.addEventListener("click", () => {
  apodDateInput.value = "";
  getToday();
});

planetsGrid.addEventListener("click", function (e) {
  const card = e.target.closest(".planet-card");
  if (!card) return;

  const planetId = card.dataset.planetId.toLowerCase();

  let selectedPlanet;
  for (let i = 0; i < planets.length; i++) {
    if (planets[i].englishName.toLowerCase() === planetId) {
      selectedPlanet = planets[i];
      break;
    }
  }

  if (selectedPlanet) {
    displayPlanets(selectedPlanet);
  }
});

window.addEventListener("load", function () {
  getToday();
  getLaunchesData();
  getPlanetsData();
});

async function getToday(selectedDate = "") {
  showLoad();

  try {
    const url = selectedDate
      ? `https://api.nasa.gov/planetary/apod?api_key=noaWFoR0U8mpCYQCk6q0ysYJw9of9u7d2SA2HCNC&date=${selectedDate}`
      : `https://api.nasa.gov/planetary/apod?api_key=noaWFoR0U8mpCYQCk6q0ysYJw9of9u7d2SA2HCNC`;

    const response = await fetch(url);
    const data = await response.json();

    displayContainer(data);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoad();
  }
}

function displayContainer(data) {
  apodImage.src = data.url;

  apodTitle.textContent = data.title;

  apodExplanation.textContent = data.explanation;
  // document.getElementById("apod-date-p").innerHTML=`  Astronomy Picture of the Day -${stringDate}`
  const stringDate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("apod-date-p").innerHTML =
    `  Astronomy Picture of the Day -${stringDate}`;

  document.getElementById("apod-date-detail").innerHTML =
    `<i class="far fa-calendar mr-2"></i>${stringDate}`;
}
function showLoad() {
  loader.classList.remove("hidden");
}

function hideLoad() {
  loader.classList.add("hidden");
}

async function getLaunchesData() {
  try {
    let response = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    );
    let data = await response.json();

    if (data.results.length > 0) {
      firstLaunch(data.results[0]);
    }
    displayLaunches(data);
  } catch (err) {
    console.error("Failed to load launches:", err);
    launchesGrid.innerHTML = `
      <div class="text-center py-10">
        Failed to load launches.
      </div>
    `;
  }
}

function displayLaunches(data) {
  let cartona = "";

  for (let index = 1; index < data.results.length; index++) {
    const launch = data.results[index];

    const formattedDate = new Date(launch.net).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    cartona += `
    <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
                
                <div class="relative h-48 overflow-hidden bg-slate-900/50">
                    <img src="${launch.image?.image_url || "./assets/images/launch-placeholder.png"}" alt="${launch.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null; this.src='./assets/images/launch-placeholder.png';">
                    <div class="absolute top-3 right-3">
                        <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                            ${launch.status.abbrev}
                        </span>
                    </div>
                </div>
                
                
                <div class="p-5">
                    <div class="mb-3">
                        <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                           ${launch.name}
                        </h4>
                        <p class="text-sm text-slate-400 flex items-center gap-2">
                            <i class="text-xs" data-fa-i2svg=""><svg class="svg-inline--fa fa-building" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"></path></svg></i>
                            ${launch.launch_service_provider.name}
                        </p>
                    </div>
                    
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center gap-2 text-sm">
                            <i class="text-slate-500 w-4" data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"></path></svg></i>
                            <span class="text-slate-300">${formattedDate}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <i class="text-slate-500 w-4" data-fa-i2svg=""><svg class="svg-inline--fa fa-clock" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
                            <span class="text-slate-300">07:30 AM UTC</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <i class="text-slate-500 w-4" data-fa-i2svg=""><svg class="svg-inline--fa fa-rocket" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rocket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path></svg></i>
                            <span class="text-slate-300">${launch.rocket.configuration.name}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <i class="text-slate-500 w-4" data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>
                            <span class="text-slate-300 line-clamp-1">${launch.pad.location.name}</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                        <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                            Details
                        </button>
                        <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
  }
  launchesGrid.innerHTML = cartona;
}

function firstLaunch(launch) {
  const formattedDate = new Date(launch.net).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  featuredLaunch.innerHTML = `
    <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
      <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
 
        <div class="flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                
                        <i class="fas fa-star"></i> Featured Launch
              </span>
              <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                Go
              </span>
            </div>
 
            <h3 class="text-3xl font-bold mb-3 leading-tight">${launch.name}</h3>
 
            <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
              <div class="flex items-center gap-2 ">
                <span> <i class="fas fa-building"></i> ${launch.launch_service_provider.name}</span>
              </div>
              <div class="flex items-center gap-2">
                <span> <i class="fas fa-rocket"></i> ${launch.rocket.configuration.name}</span>
              </div>
            </div>
 
            <div class="grid xl:grid-cols-2 gap-4 mb-6">
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2"> <i class="fas fa-calendar"></i>Launch Date</p>
                <p class="font-semibold">${formattedDate}</p>
              </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">12:00 PM UTC</p>
                      </div>
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2 "><i class="fas fa-map-marker-alt"></i>Location</p>
                <p class="font-semibold text-sm">  ${launch.pad.location.name}</p>
              </div>
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2"> <i class="fas fa-globe"></i>Country</p>
                <p class="font-semibold">${launch.pad.location.country.name}</p>
              </div>
            </div>
 
            <p class="text-slate-300 leading-relaxed mb-6">
              ${launch.mission?.description || "No mission description available."}
            </p>
          </div>
 
          <div class="flex flex-col md:flex-row gap-3">
            <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold">
              View Full Details
            </button>
            <div class="flex gap-2 self-end md:self-center">
 <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
            </div>
          </div>
        </div>
 
        <div class="relative">
          <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
            <img
              src="${launch.image?.image_url || "./assets/images/launch-placeholder.png"}"
              alt="${launch.name}"
              class="w-full h-full object-cover"
           
            >
            <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
        </div>
 
      </div>
    </div>
  `;
}

let planets = [];

async function getPlanetsData() {
  try {
    let response = await fetch(
      "https://solar-system-opendata-proxy.vercel.app/api/planets",
    );
    let data = await response.json();
    planets = data.bodies;

    if (planets.length > 0) {
      displayPlanets(planets[0]);
    }
  } catch (err) {
    console.error("Failed to load planets data:", err);
  }
}

function displayPlanets(planet) {
  if (!planet) return;

  planetImage.src = planet.image;
  planetName.textContent = planet.englishName;
  planetDescription.textContent = planet.description;
  planetDistance.textContent = planet.semimajorAxis + " km";
  planetRadius.textContent = planet.meanRadius + " km";
  planetMass.textContent = `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;
  planetDensity.textContent = planet.density + " g/cm³";
  planetGravity.textContent = planet.gravity + " m/s²";
  planetMoons.textContent = planet.moons ? planet.moons.length : 0;
  planetPeriod.textContent = planet.sideralOrbit + " days";
  planetRotation.textContent = planet.sideralRotation + " hours";

  displayDiscoveryInfo(planet);
  displayOrbital(planet);
  displayFacts(planet);
}

function displayDiscoveryInfo(planet) {
  planetDiscoverer.textContent = planet.discoveredBy || "Known since antiquity";
  planetDiscovererDate.textContent = planet.discoveryDate || "Ancient times";
  planetVolume.textContent = `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`;
}

function displayOrbital(planet) {
  planetPerihelion.textContent =
    (planet.perihelion / 1_000_000).toFixed(1) + "M km";
  planetAphelion.textContent =
    (planet.aphelion / 1_000_000).toFixed(1) + "M km";
  planetEccentricity.textContent = planet.eccentricity;
  planetInclination.textContent = planet.inclination
    ? planet.inclination + "°"
    : "N/A";
  planetAxialTilt.textContent = planet.axialTilt + "°";
  planetTemp.textContent = planet.avgTemp ? planet.avgTemp + "°C" : "N/A";
}

function displayFacts(planet) {
  const facts = [
    {
      label: "Mass",
      value: `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`,
    },
    { label: "Surface gravity", value: `${planet.gravity} m/s²` },
    { label: "Density", value: `${planet.density} g/cm³` },
    { label: "Axial tilt", value: `${planet.axialTilt}°` },
  ];

  let cartona = "";
  for (let i = 0; i < facts.length; i++) {
    cartona += `
      <li class="flex items-start">
        <i class="text-green-400 mt-1 mr-2" data-fa-i2svg=""></i>
        <span class="text-slate-300">
          ${facts[i].label}: ${facts[i].value}
        </span>
      </li>
    `;
  }

  planetFacts.innerHTML = cartona;
}

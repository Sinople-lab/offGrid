const form = document.querySelector('#sizing-form')
const loadInput = document.querySelector('#load')
const sunHoursInput = document.querySelector('#sun-hours')
const daylightInput = document.querySelector('#daylight-hours')
const nightInput = document.querySelector('#night-hours')

const arrayResult = document.querySelector('#array-result')
const batteryResult = document.querySelector('#battery-result')

function updateCalculation(event) {
  event?.preventDefault()
  const load = Number(loadInput.value)
  const peakHours = Number(sunHoursInput.value)
  const daylightHours = Number(daylightInput.value)
  const nightHours = Number(nightInput.value)

  if (!Number.isFinite(load) || !Number.isFinite(peakHours)|| !Number.isFinite(daylightHours)|| !Number.isFinite(nightHours) || nightHours <= 0|| daylightHours <= 0|| load <= 0 || peakHours <= 0) return

  const daylightEnergy = load * daylightHours
  const nightEnergy = load * nightHours
  const batteryEnergy = nightEnergy / (0.8 * 0.9)
  const solarArray = (batteryEnergy + daylightEnergy) / (peakHours * 0.75)

  arrayResult.textContent = solarArray.toFixed(3)
  batteryResult.textContent = batteryEnergy.toFixed(3)
}

form.addEventListener('submit', updateCalculation)
sunHoursInput.addEventListener('input', updateCalculation)
loadInput.addEventListener('input', updateCalculation)
daylightInput.addEventListener('input', updateCalculation)
nightInput.addEventListener('input', updateCalculation)

updateCalculation()

const cycleLabel = document.querySelector('#cycle-label')
const flowCaption = document.querySelector('#flow-caption')
const dayLabel = document.querySelector('#day-label')
const nightLabel = document.querySelector('#night-label')
let isNight = false

setInterval(() => {
  isNight = !isNight
  document.body.classList.toggle('night-mode', isNight)
  cycleLabel.textContent = isNight ? 'Night cycle' : 'Daylight cycle'
  flowCaption.textContent = isNight ? 'Stored energy flows from the battery to the load.' : 'Solar energy feeds the load and charges the battery.'
  dayLabel.classList.toggle('active-phase', !isNight)
  nightLabel.classList.toggle('active-phase', isNight)
}, 5000)

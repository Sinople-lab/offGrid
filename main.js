const form = document.querySelector('#sizing-form')
const loadInput = document.querySelector('#load')
const sunHoursInput = document.querySelector('#sun-hours')
const arrayResult = document.querySelector('#array-result')
const batteryResult = document.querySelector('#battery-result')

function updateCalculation(event) {
  event?.preventDefault()
  const load = Number(loadInput.value)
  const peakHours = Number(sunHoursInput.value)
  if (!Number.isFinite(load) || !Number.isFinite(peakHours) || load <= 0 || peakHours <= 0) return

  const daylightEnergy = load * 10
  const nightEnergy = load * 14
  const batteryEnergy = nightEnergy / (0.8 * 0.9)
  const solarArray = (batteryEnergy + daylightEnergy) / (peakHours * 0.8)

  arrayResult.textContent = solarArray.toFixed(2)
  batteryResult.textContent = batteryEnergy.toFixed(2)
}

form.addEventListener('submit', updateCalculation)
sunHoursInput.addEventListener('input', updateCalculation)
loadInput.addEventListener('input', updateCalculation)
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

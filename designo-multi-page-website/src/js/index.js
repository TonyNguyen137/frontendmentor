import { Navbar } from './components'
import { validateForm } from './form-validation'
import { initializeMap } from './leaflet-map'
import { $$ } from './utils'

new Navbar()
validateForm()

$$('.location').forEach((location) => {
  const lat = location.dataset.lat
  const long = location.dataset.long

  const mapId = location.querySelector('.location__col-map').id
  initializeMap(mapId, lat, long)
})

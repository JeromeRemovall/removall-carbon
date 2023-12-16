import DataMap from  'datamaps'

 class Maps {

	constructor(map) {
		this.zoom = 1
		this.positionX = 0
		this.positionY = 0
		this.positionXTpm = 0
		this.positionYTpm = 0
		this.stepZoom = 0.3
		this.map = map
		this.mapStyle = map?.querySelector('g')
		this.moveMap = this.moveMap.bind(this);
		this.actualGeo = null
		this.itemsList = null
		this.itemLength = 0
		this.itemIndex = 0
		this.interval = null
		this.intervalTime = 2000
	}

	initControls() {

		this.map?.addEventListener("mousedown", (_eventStart) => {
			this.positionXTpm = _eventStart.clientX
			this.positionYTpm = _eventStart.clientY
			this.map.addEventListener("mousemove", this.moveMap)
		})

		this.map?.addEventListener("mouseup", (_event) => {
			this.positionXTpm = 0
			this.positionYTpm = 0
			this.map.removeEventListener("mousemove", this.moveMap)
		})
	}

	moveMap(_event) {
		this.positionX += (_event.clientX - this.positionXTpm)
		this.positionY += (_event.clientY - this.positionYTpm)
		this.positionXTpm += (_event.clientX - this.positionXTpm)
		this.positionYTpm += (_event.clientY - this.positionYTpm)
		this.updateStyle()
	}

	updateStyle() {

		this.mapStyle.style.transform = `scale(${this.zoom}) translate(${this.positionX}px, ${this.positionY}px)`
	}

	zoomIn() {
		this.zoom += this.stepZoom
		this.updateStyle()
	}

	zoomOut() {
		this.zoom -= this.stepZoom
		
		if(this.zoom < 1) {
			this.zoom = 1
		}

		this.updateStyle()
	}

	listItem(projects) {
		let lists = ''
		for(let i = 0; i<projects.length; i++) {
			if(this.itemIndex == i) {
				lists += `<li class='active'>${projects[i].name}</li>`
			} else {
				lists += `<li class=''>${projects[i].name}</li>`
			}
		}
		return lists;
	}

	templatePopIn(geo, data) {

		if(data) {

			if(geo.id !== this.actualGeo) {
				this.actualGeo = geo.id
				this.itemsList = null
				clearTimeout(this.interval);
				this.interval = null
				this.itemLength = 0
				this.itemIndex = 0
			} else if( this.itemsList === null ) {
				const timeout = setTimeout(() => {
					let dom = document.querySelectorAll(".hover_container ul li")
					this.itemsList = dom
					this.itemLength = dom.length
					clearTimeout(timeout);
				}, 10);
			} else if(this.itemsList != null & this.itemLength > 0 & this.interval == null) {
				this.interval = setInterval(() => {
					let dom = document.querySelectorAll(".hover_container ul li")
					dom[this.itemIndex]?.classList.remove('active')
					this.itemIndex =  (this.itemIndex + 1) % this.itemLength
					dom[this.itemIndex]?.classList.add('active')
				}, this.intervalTime)
			}

			return `
			<div class="hover_container">
				<div class="hover_container_illu"></div>
				<div class="hover_container_info">
					<p class="title"> ${data.projects.length} projets</p>
					<p class="subtitle">${data.place}</p>
					<ul class="list_item">
						${this.listItem(data.projects)}
					</ul>
				</div>
			</div>`
			
		}
	}

}

 export default Maps;
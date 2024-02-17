import DataMap from "datamaps";
import { isMobile } from "./global";

class Maps {
  constructor(map) {
    this.zoom = 1;
    this.positionX = 0;
    this.positionY = 0;
    this.positionXTpm = 0;
    this.positionYTpm = 0;
    this.stepZoom = 0.3;
    this.map = map;
    this.mapStyle = map?.querySelector("g");
    this.moveMap = this.moveMap.bind(this);
    this.actualGeo = null;
    this.itemsImgList = null;
    this.itemImgLength = 0;
    this.itemsList = null;
    this.itemLength = 0;
    this.itemIndex = 0;
    this.interval = null;
    this.intervalTime = 2000;
  }

  initControls() {
    this.map?.addEventListener(
      "mousedown",
      (_eventStart) => {
        this.positionXTpm = _eventStart.clientX;
        this.positionYTpm = _eventStart.clientY;
        this.map.addEventListener(
          "mousemove",
          this.moveMap
        );
      }
    );

    this.map?.addEventListener(
      "mouseup",
      (_event) => {
        this.positionXTpm = 0;
        this.positionYTpm = 0;
        this.map.removeEventListener(
          "mousemove",
          this.moveMap
        );
      }
    );

    this.map?.addEventListener(
      "touchstart",
      (_eventStart) => {
        this.positionXTpm = _eventStart.clientX;
        this.positionYTpm = _eventStart.clientY;
        this.map.addEventListener(
          "touchend",
          this.moveMap
        );
      }
    );
  }

  moveMap(_event) {
    this.positionX +=
      _event.clientX - this.positionXTpm;
    this.positionY +=
      _event.clientY - this.positionYTpm;
    this.positionXTpm +=
      _event.clientX - this.positionXTpm;
    this.positionYTpm +=
      _event.clientY - this.positionYTpm;
    this.updateStyle();
  }

  updateStyle() {
    this.mapStyle.style.transform = `scale(${this.zoom}) translate(${this.positionX}px, ${this.positionY}px)`;
  }

  zoomIn() {
    this.zoom += this.stepZoom;
    this.updateStyle();
  }

  zoomOut() {
    this.zoom -= this.stepZoom;

    if (this.zoom < 1) {
      this.zoom = 1;
    }

    this.updateStyle();
  }

  listMedia(projects) {
    let lists = "";
    for (let i = 0; i < projects.length; i++) {
      if (this.itemIndex == i) {
        lists += `<img src='${projects[i].image}' class='active'/>`;
      } else {
        lists += `<img src='${projects[i].image}' class=''/>`;
      }
    }
    return lists;
  }

  listItem(projects) {
    let lists = "";
    for (let i = 0; i < projects.length; i++) {
      if (this.itemIndex == i) {
        lists += `<li class='active'>${projects[i].name}</li>`;
      } else {
        lists += `<li class=''>${projects[i].name}</li>`;
      }
    }
    return lists;
  }

  clearData(data, lang) {
    const dataClean = data
      .map((element) => element.node)
      .filter((r) => r.posts.nodes.length > 0);
    let dataFormate = {};
    dataClean.forEach((item) => {
      const pays = item.paysTax;
      dataFormate[pays.code] = {
        fillKey: "project",
        place: `${pays.nomDuPays}, ${pays.capitale}`,
        projects: [],
      };

      item.posts.nodes.forEach((projet) => {
        if (
          projet.projetsMap.nomDuProjet !== null
        ) {
          dataFormate[pays.code].projects.push({
            name:
              lang == "fr"
                ? projet.projetsMap.nomDuProjet
                : projet.projetsMap
                    ?.nomDuProjetEn,
            image:
              projet.projetsMap?.imageDuProjet
                ?.mediaItemUrl,
          });
        }
      });
    });
    this.data = dataFormate;
    return dataFormate;
  }

  templatePopIn(geo, data) {
    if (data) {
      if (geo.id !== this.actualGeo) {
        this.actualGeo = geo.id;
        this.itemsList = null;
        clearTimeout(this.interval);
        this.interval = null;
        this.itemLength = 0;
        this.itemIndex = 0;
        this.templatePopIn(geo, data);
      } else if (this.itemsList === null) {
        const timeout = setTimeout(() => {
          let domIMG = document.querySelectorAll(
            ".hover_container img"
          );
          let dom = document.querySelectorAll(
            ".hover_container ul li"
          );
          this.itemsList = dom;
          this.itemLength = dom.length;
          this.itemsImgList = domIMG;
          this.itemImgLength = domIMG.length;
          clearTimeout(timeout);
          this.templatePopIn(geo, data);
        }, 10);
      } else if (
        (this.itemsList != null) &
        (this.itemLength > 0) &
        (this.interval == null)
      ) {
        this.interval = setInterval(() => {
          let dom = document.querySelectorAll(
            ".hover_container ul li"
          );
          let domImg = document.querySelectorAll(
            ".hover_container img"
          );
          domImg[
            this.itemIndex
          ]?.classList.remove("active");
          dom[this.itemIndex]?.classList.remove(
            "active"
          );
          this.itemIndex =
            (this.itemIndex + 1) %
            this.itemLength;
          domImg[this.itemIndex]?.classList.add(
            "active"
          );
          dom[this.itemIndex]?.classList.add(
            "active"
          );
        }, this.intervalTime);
      }
      let projetName = " projet";
      if (data.projects.length > 1) {
        projetName = "projets";
      }

      const result = `
			<div class="hover_container">
				<div class="hover_container_illu">
					${this.listMedia(data.projects)}
				</div>
				<div class="hover_container_info">
					<p class="title"> ${
            data.projects.length
          } ${projetName}</p>
					<p class="subtitle">${data.place}</p>
					<ul class="list_item">
						${this.listItem(data.projects)}
					</ul>
				</div>
			</div>`;
      if (isMobile()) {
        const infoContainer =
          document.querySelector(
            ".info_container #maps_mobile"
          );
        const infopContainer =
          document.querySelector(
            ".info_container p"
          );
        infopContainer.style.display = "none";
        infoContainer.innerHTML = result;
      } else {
        return result;
      }
    } else {
      const infoContainer =
        document.querySelector(
          ".info_container #maps_mobile"
        );
      const infopContainer =
        document.querySelector(
          ".info_container p"
        );
      infopContainer.style.display = "block";
      infoContainer.innerHTML = "";
    }
  }
}

export default Maps;

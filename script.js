const panel = document.getElementById("info-panel");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("close-panel");
let lastHotspot = null;

const hotspotInfo = {
    warRoom: {
        title: "War Room",
        text: "The War Room served as a working and planning space for daily household activities.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Historic_room.jpg/640px-Historic_room.jpg",
        timeline: [
            { date: "1890", description: "Room constructed with hand-hewn timber." }
        ]
    },
    livingRoom: {
        title: "Living Room",
        text: "The Living Room was a communal space used for meals, conversation, and gatherings.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Historic_parlor.jpg/640px-Historic_parlor.jpg",
        timeline: [
            { date: "1900", description: "Furnished with handmade items created by local craftsmen." }
        ]
    },
    breezeway: {
        title: "Breezeway",
        text: "The dogtrot breezeway provided natural cooling by allowing air to pass through the home.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dogtrot.jpg/640px-Dogtrot.jpg",
        timeline: [
            { date: "1890", description: "Constructed as part of the traditional dogtrot design." }
        ]
    },
    porch: {
        title: "Front Porch",
        text: "The porch functioned as an outdoor workspace and gathering area for the family.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Old_front_porch.jpg/640px-Old_front_porch.jpg",
        timeline: []
    }
};

function closePanel() {
    if (!panel.classList.contains("open")) return;

    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    lastHotspot?.focus();
}

function renderTimeline(entries) {
    const container = document.getElementById("timeline-container");
    container.replaceChildren();
    if (!entries.length) return;

    const wrap = document.createElement("div");
    wrap.className = "timeline";

    entries.forEach(({ date, description }) => {
        const item = document.createElement("div");
        item.className = "timeline-entry";

        const dateElement = document.createElement("div");
        dateElement.className = "timeline-date";
        dateElement.textContent = date;

        const descriptionElement = document.createElement("div");
        descriptionElement.className = "timeline-description";
        descriptionElement.textContent = description;

        item.append(dateElement, descriptionElement);
        wrap.appendChild(item);
    });

    container.appendChild(wrap);
}

function loadHotspotInfo(id, hotspot) {
    const data = hotspotInfo[id];
    if (!data) return;

    document.getElementById("info-title").textContent = data.title;
    document.getElementById("info-text").textContent = data.text;

    const image = document.getElementById("info-image");
    image.src = data.image;
    image.style.display = "block";
    image.onerror = () => {
        image.removeAttribute("src");
        image.style.display = "none";
    };

    renderTimeline(data.timeline);
    lastHotspot = hotspot || document.activeElement;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    closeButton.focus();
}

document.querySelectorAll(".hotspot").forEach((hotspot) => {
    const activate = () => loadHotspotInfo(hotspot.dataset.hotspot, hotspot);
    hotspot.addEventListener("click", activate);
    hotspot.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate();
        }
    });
});

overlay.addEventListener("click", closePanel);
closeButton.addEventListener("click", closePanel);
document.addEventListener("keydown", (event) => {
    if (!panel.classList.contains("open")) return;

    if (event.key === "Escape") {
        closePanel();
        return;
    }

    if (event.key === "Tab") {
        event.preventDefault();
        closeButton.focus();
    }
});

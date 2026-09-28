/**
 * Photo credits for the images in /public/vehicles and /public/destinations.
 * ---------------------------------------------------------------
 * These are Wikimedia Commons photos, used under the licence listed
 * against each one. Number plates (and any painted phone numbers)
 * have been removed from the images. The licences require this
 * credit to stay visible; when a photo is swapped for your own fleet
 * photography, delete its entry here.
 */
export interface PhotoCredit {
  author: string;
  license: string;
  source: string;
}

export const photoCredits: Record<string, PhotoCredit> = {
  "/vehicles/alto.jpg": {
    author: "Biswarup Ganguly",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Maruti_Suzuki_-_Alto_800_LXi.JPG",
  },
  "/vehicles/wagonr.jpg": {
    author: "Riding Hub",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:2020_Maruti_Suzuki_Wagon_R_VXi_(O)_(India)_front_view.png",
  },
  "/vehicles/swift.jpg": {
    author: "Premnath Kudva",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Maruti_Suzuki_Swift_2098.JPG",
  },
  "/vehicles/dzire.jpg": {
    author: "Sant1207ug",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Suzuki_Dzire_2024_ZXI%2B.jpg",
  },
  "/vehicles/ertiga.jpg": {
    author: "Ramakrishna Mission Vidyapith",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:2022_Maruti_Suzuki_Ertiga_LXi.jpg",
  },
  "/vehicles/eeco.jpg": {
    author: "Bams siblings",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:White_Maruti_Eeco_01.jpg",
  },
  "/vehicles/bolero.jpg": {
    author: "SnapMeUp",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Mahindra_Bolero_Gen_3.jpg",
  },
  "/vehicles/scorpio.jpg": {
    author: "RL GNZLZ from Chile",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Mahindra_Scorpio_GLX_2015_(53537807901).jpg",
  },
  "/vehicles/innova.jpg": {
    author: "Premnath Kudva",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Toyota_Innova_Crysta_2.4_Z_side.jpg",
  },
  "/vehicles/thar.jpg": {
    author: "The Drivers Hub",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Mahindra_Thar_ROXX_on_dirt.jpg",
  },
  "/vehicles/sumo.jpg": {
    author: "order_242 from Chile",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tata_Sumo_2.0_TDi_2001_(15730560078).jpg",
  },
  "/vehicles/traveller.jpg": {
    author: "Yann Forget",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Force_Traveller,_Leh-Manali_Highway.jpg",
  },
  "/vehicles/traveller2.jpg": {
    author: "OnkelFordTaunus",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:ForceTravellerside.JPG",
  },
  "/vehicles/minibus.jpg": {
    author: "Timothy A. Gonsalves",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Private_Bus_Asanang_Tura_Oct24_A7CR_03808.jpg",
  },
  "/vehicles/bus.jpg": {
    author: "Timothy A. Gonsalves",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Pvt_Bus_MGR_Bus_Stand_Tirunelveli_Apr22_A7C_01851.jpg",
  },
  "/vehicles/bpickup.jpg": {
    author: "Keshav Prawasi",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:500px_photo_(216824161).jpeg",
  },
  "/vehicles/camper.jpg": {
    author: "Ominae",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Mahindra_Bolero_Camper_Front.JPG",
  },
  "/vehicles/ace.jpg": {
    author: "SnapMeUp",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Tata_Ace_Mini_Truck_(2).JPG",
  },
  "/vehicles/t407.jpg": {
    author: "Sambitpatra2003",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:TATA_407_Ex2.jpg",
  },
  "/vehicles/lpt.jpg": {
    author: "Gerd Eichmann",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Sambal-12-Tankstop-NH3-Truck-gje.jpg",
  },
  "/vehicles/tipper.jpg": {
    author: "lalit890",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Shimla,_Himachal_Pradesh,_India_-_panoramio.jpg",
  },
  "/vehicles/tractor.jpg": {
    author: "Ganesh Mohan T",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Mahindra_415_Di_XP_Plus_Tractor.jpg",
  },
  "/vehicles/trolley.jpg": {
    author: "SnapMeUp",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Mahindra_Arjun_605_DI_tractor_with_trailer.JPG",
  },
  "/vehicles/jcb.jpg": {
    author: "Abhishekptlbbk",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:JCB_India.jpg",
  },
  "/vehicles/jcb2.jpg": {
    author: "Ramesh NG",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:JCB_-_Backhoe_loader.jpg",
  },
  "/vehicles/jcb3.jpg": {
    author: "Timothy A. Gonsalves",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Road_Work_Zanskar_Sumdo_Lahaul_Oct20_D72_18188.jpg",
  },
  // Destination photos (resized). Padri Jot and Sach Pass are our own photos, so no credit.
  "/destinations/amritsar.jpg": {
    author: "Bernard Gagnon",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Golden_Temple,_Amritsar_01.jpg",
  },
  "/destinations/manimahesh.jpg": {
    author: "NaturenHuman",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Mt._Kailash_Manimahesh_Lake.jpg",
  },
  "/destinations/chandigarh-rock-garden.jpg": {
    author: "thoughtsillustrated.blogspot.com",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Rock_Garden_of_Chandigarh_-_bangle_sculptures.JPG",
  },
  "/destinations/haridwar.jpg": {
    author: "आशीष भटनागर",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Har_ki_Pauri,_Haridwar_2.jpg",
  },
  "/destinations/delhi.jpg": {
    author: "Nikhilb239",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:India_Gate,_New_Delhi_from_West.jpg",
  },
};

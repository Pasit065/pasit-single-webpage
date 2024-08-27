const PROJECTS_DETAILS = 
[
    {
        name: `Embedded Smart Vision for Human and Detection and Counting`,
        message: `This is my graduated project. My group uses Jetson Nano with 
                  object detection model named YOLOv5' to detect intruder 
                  in restricted area and notify users when intruders have been 
                  detected. Moreover we store every intruders data in google sheet 
                  and sqlite3 database.`,
        fileLocation: process.env.PUBLIC_URL + `/assets/img/graduated-proj-pic.jpg`
    },
    {
        name: `Iss detection`,
        message: `This is my Python projects that will using REST API to 
                  detect ISS current location and compare with specific location. 
                  Also sending some notify if ISS is so close to my specific location.`,
        fileLocation: process.env.PUBLIC_URL + `/assets/img/iss-detect-proj-pic.jpg`           
    },
    {
        name: `Synchronous speed calculation`,
        message: `This is my tkinter framework project. In this projects is using 
                  for calculating synchronous speed by using tkinter responsive window.`,
        fileLocation: process.env.PUBLIC_URL + `/assets/img/tkinter-proj-pic.jpg`   
    },
    {
        name: `Rain detection`,
        message: `This projects will using REST API to get rain data from specific position 
                  in next 12 hours and notify to sms if the rain will occur.`,
        fileLocation: process.env.PUBLIC_URL + `/assets/img/rain-detect-pic.jpg`   
    }
];


export default PROJECTS_DETAILS;

# Ideas for the Project of Q3 (Qualifikationsphase 3) of Oberstufe (High School)

<br>

## Notes/ Classroom app

<br>

- ### Architecture
    - Web Application
        - Selenium for desktop interface
        - Website version
    - Languages
        - HTML, CSS
        - Javascript
	- node modules
		- reactjs: better webdev i guess
		- electron to run web-app as desktop-app
		- concurrently & wait-on for react-electron compatibility (wait-on listens to react-webserver to display in electron-desktop-app)

    - Full Desktop Application in C++ 
    	- Desktop only

- ### Functionality
    - Whiteboard
    - Notetaking
    - Drawing Tablet/ Smartboard Support 
    - Tools
    - Pen
    - Shape
    - Textbox
    - Arrow
    - 
    - Markdown Support

<br/> <br/> <br/>

## WORKING WITH THIS REPOSITORY
	
- ### Prerequisites:
	- Git
	- NodeJS


### Testing/ Development

<br/>

1. #### **Clone the Repo**
```console
foo@bar:~$ git clone https://github.com/janeuster/q3-project.git
```

<br/>

2. Switch to ideas Branch
MUST be executed in the folder of the cloned repo 
```console
foo@bar:~$ git checkout ideas
```

<br/>

2. #### **Install Node Package Depencencies** 


MUST be executed in the folder of the cloned repo 
```console
foo@bar:~$ npm install
```
3. #### **Start the Live Development Version**

<br/>

MUST be executed in the folder of the cloned repo 
```console
foo@bar:~$ npm run dev
```
You will see a desktop application appear. Anytime a file within the repositories directory is changed, those changes will appear in the live development desktop application.
The app can also be accessed via the browser(localhost:PORT). BY default the port is set to 3000(**localhost:3000**).

<br/>

### BUILDING

- Windows
		
[Instructions](https://www.electronjs.org/docs/latest/development/build-instructions-windows/dd//www.electronjs.org/docs/latest/development/build-instructions-windows/)
IMPORTANT: DONT FORGET TO INSTALL GN AND TO ADD IT TO THE SYSTEM PATH, LIKE I DID

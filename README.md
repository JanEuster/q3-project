# Informatik Leistungskurs Projekt Q3

<br>

### Lehrer: Sergej Lessin

### Teilnehmer: Lennart Brunn, Jan Eusterschulte, Friedrich Maagk

### Thema: Web based GUI Application for Classrooms

### Name: 

### <u>Nutzung:</u> 

- Lehrer: Whiteboard Programm
- Schüler: Notizen Programm



## Planung

- **Werkzeuge (Tools)**
  - Beweg (Move)
  - Auswahl (Select)
  - Pinsel/ Stift (Brush)
  - Radierer (Shapes)
    - Rechteck
    - Dreieck
    - Ellipse
- **Panels**
  - Farben
  - Werkzeuge (Tools)
- **Exportieren**
  - Formate
    - PNG
    - JPG
    - PDF
- **Speichern**
  - Eigenes Dateiformat in XML?
- **Artboard**
  - unendlich erweiterbare






- ## Sprachen / Software
    - HTML, CSS
    - Javascript / node.js
        - Libraries/ node packages
            - React (Web UI)
            - electron
            - concurrently & wait-on for react-electron compatibility (wait-on listens to react-webserver to display in electron-desktop-app) [dev dependencies]

    

    ## Funktionsweise 

    - Web Applikation
        - Website 
    - Desktop Applikation
        - **electron** ermöglicht es eine Web Applikation aus HTML, CSS und Javascript als Desktop Programm zu nutzen (Beispiele dafür sind Visual Studio Code, Discord, Atom, Microsoft Teams, Signal, Whatspp)
        - da **electron** auf chromium basiert, ist es auf jeglichen plattformen anwendbar



## Dieses Repository nutzen

- ### Vorraussetzungen:
	- git
	- nodejs


### Testing/ Development:

<br/>

1. #### **Clone Repo**
```console
foo@bar:~$ git clone https://github.com/janeuster/q3-project.git
```

<br/>

2. **Install Node Package Depencencies** 

```console
foo@bar:~/q3-project$ npm install
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

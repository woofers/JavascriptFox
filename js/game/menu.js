//Jaxson C. Van Doorn, 2014

var MainMenu = {};

MainMenu = function(game){};

MainMenu.prototype = {
    
    preload : function(){

        //Reset Varibles
        menuSelect = 1;
        currentScreen = 1;

        //Check if Save is Created
        saveLoaded = store.get("save.loaded");
        
        //If not create Saves
        if (saveLoaded === undefined)
        {
            store.set("save.loaded", true);
            store.set("save.settings.sound", 10);
            store.set("save.slot1.chapter", "New File");
            store.set("save.slot2.chapter", "New File");
            store.set("save.slot3.chapter", "New File");
            store.set("save.slot1.x", 400);
        }
        
        //Read Save
        settings.sound = store.get("save.settings.sound");
        sav.slot1Chapter = store.get("save.slot1.chapter");
        sav.slot2Chapter = store.get("save.slot2.chapter");
        sav.slot3Chapter = store.get("save.slot3.chapter");
        player.startX = store.get("save.slot1.x");

        //Loading Screen
        if (loadedLoadingScreen === true)
        {
            game.add.sprite(0, 0, 'loadingScreen');
        }

        //Menu
        game.load.image('aboutScreen', 'assets/images/ui/about.png');
        game.load.image('backgroundScreen', 'assets/images/ui/orange.png');

        //Loading Screen
        game.load.image('loadingScreen', 'assets/images/ui/loading.png');
    },

    create : function(){

        //Draw Settings Menu            
        menu = game.add.sprite(0, 0, 'backgroundScreen');

        //Draw Text
        MainMenu.prototype.createText();

        //Display Loading Screen if the image is loaded
        loadedLoadingScreen = true;

        //Controls
        cursors = game.input.keyboard.createCursorKeys();
        select = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        backSelect = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        //Fullscreen on click
        this.input.onDown.add(MainGame.prototype.gofull, this);

        //Name
        console.log("Copyright 2014, Jaxson C. Van Doorn and Avery M. Suzuki");
    },

    createText : function(){

        //Draw Title
        text.title = game.add.text(960, 240, "FOX", titleStyle);
        text.title.anchor.setTo(0.5);
        
        //Draw Selector 1
        text.selector1 = game.add.text(960, 525, "Play");
        text.selector1.anchor.setTo(0.5);
        text.selector1.font = 'Century Gothic Bold';
        text.selector1.fontSize = 80;
        text.selector1.fill = "#fff1dd";
        
        //Draw Selector 2
        text.selector2 = game.add.text(960, 690, "Settings");
        text.selector2.anchor.setTo(0.5);
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector2.fill = "#fff1dd";

        //Draw Selector 3
        text.selector3 = game.add.text(960, 840, "About");
        text.selector3.anchor.setTo(0.5);
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
        text.selector3.fill = "#fff1dd";

        text.loaded = true;

        //Load About Screen
        MainMenu.prototype.loadAbout();
    },

    update : function(){
        
        //Selectors
        if (menuSelect == 1 && text.loaded === true)
        {
            MainMenu.prototype.highlight1();
        }
        if (menuSelect == 2 && text.loaded === true)
        {
            MainMenu.prototype.highlight2();
        }
        if (menuSelect == 3 && text.loaded === true)
        {
            MainMenu.prototype.highlight3();
        }

        //Main Menu
        if (currentScreen == 1 && text.loaded === true)
        {
            MainMenu.prototype.mainText();

                //Play
                if (menuSelect == 1)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        currentScreen = 2;
                        menuSelect = 1;
                    }
                }

                //Settings
                if (menuSelect == 2)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        currentScreen = 3;
                        menuSelect = 1;
                    }
                }

                //About
                if (menuSelect == 3)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        aboutMenu.visible =! aboutMenu.visible;
                        currentScreen = 4;
                        menuSelect = 1;
                    }
                }
        }

        //Save Slots
        if (currentScreen == 2 && text.loaded === true)
        {
            MainMenu.prototype.saveText();
            
                //Slot 1
                if (menuSelect == 1)
                {
                    //Enter
                    if (select.isDown && keyDebouncing.enterPressed === false)
                    {
                        keyDebouncing.enterPressed = true;
                        MainMenu.prototype.exitSlot1();
                    }
                }

                //Slot 2
                if (menuSelect == 2)
                {

                }

                //Slot 3
                if (menuSelect == 3)
                {

                }

                //Go Back
                if (backSelect.isDown)
                {
                    currentScreen = 1;
                    menuSelect = 1;
                }
        }
        
        //Settings
        if (currentScreen == 3 && text.loaded === true)
        {
            MainMenu.prototype.settingsText();

                //Resolution
                if (menuSelect == 1)
                {

                }

                //Fullscreen
                if (menuSelect == 2)
                {

                }

                //Sound
                if (menuSelect == 3)
                {
                    //Sound Down
                    if (settings.sound > 0 && cursors.left.isDown && keyDebouncing.leftPressed === false)
                    {
                        keyDebouncing.leftPressed = true;
                        MainMenu.prototype.soundDown(); 
                    }

                    //Sound Up
                    if (settings.sound < 10 && cursors.right.isDown && keyDebouncing.rightPressed === false)
                    {
                        keyDebouncing.rightPressed = true;
                        MainMenu.prototype.soundUp();
                    }
                }

                //Go Back
                if (backSelect.isDown)
                {
                    currentScreen = 1;
                    menuSelect = 2;
                }
        }

        //About
        if (currentScreen == 4 && text.loaded === true)
        {
            //Go Back
            if (backSelect.isDown)
            {
                aboutMenu.visible =! aboutMenu.visible;
                currentScreen = 1;
                menuSelect = 3;
            }
        }
        
        //Up
        if (cursors.up.isDown && keyDebouncing.upPressed === false)
        {
            keyDebouncing.upPressed = true;
            menuSelect = menuSelect - 1;
        }

        //Down
        else if (cursors.down.isDown && keyDebouncing.downPressed === false)
        {
            keyDebouncing.downPressed = true;
            menuSelect = menuSelect + 1;
        }

        //Key Deboucing
        if (!cursors.up.isDown)
        {
            keyDebouncing.upPressed = false;
        }
        if (!cursors.down.isDown)
        {
            keyDebouncing.downPressed = false;
        }
        if (!cursors.right.isDown)
        {
            keyDebouncing.rightPressed = false;
        }
        if (!cursors.left.isDown)
        {
            keyDebouncing.leftPressed = false;
        }
        if (!select.isDown)
        {
            keyDebouncing.enterPressed = false;
        }

        //Looping
        if (menuSelect > 3)
        {
            menuSelect = 1;
        }
        if (menuSelect < 1)
        {
            menuSelect = 3;
        }

        //Rescale when In and Out of Fullscreen
        if (Phaser.ScaleManager.prototype.isFullScreen === null)
        {
            game.scale.maxWidth = 1368;
            game.scale.maxHeight = 768;
            game.scale.setScreenSize();
            settings.fullscreenString = "Off";
            settings.fullscreen = false;
        }
        else 
        {
            game.scale.maxWidth = 1920;
            game.scale.maxHeight = 1080;
            game.scale.setScreenSize();
            settings.fullscreenString = "On";
            settings.fullscreen = true;
        }
        
        //Change Resolution String
        settings.resolutionWidth = game.scale.width;
        settings.resolutionHeight = game.scale.height;

        //Update Sound String
        settings.soundString = settings.sound.toString();

        //Auto Save
        store.set("save.settings.sound", settings.sound);
    },

    render : function(){

    },

    loadAbout : function(){

        //Toggle About Menu
        aboutMenu = game.add.sprite(0, 0, 'aboutScreen');
        aboutMenu.visible =! aboutMenu.visible;
    },

    highlight1: function(){

        text.selector1.font = 'Century Gothic Bold';
        text.selector1.fontSize = 80;
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
    },

    highlight2: function(){

        text.selector1.font = 'Century Gothic';
        text.selector1.fontSize = 60;
        text.selector2.font = 'Century Gothic Bold';
        text.selector2.fontSize = 80;
        text.selector3.font = 'Century Gothic';
        text.selector3.fontSize = 60;
    },

    highlight3: function(){

        text.selector1.font = 'Century Gothic';
        text.selector1.fontSize = 60;
        text.selector2.font = 'Century Gothic';
        text.selector2.fontSize = 60;
        text.selector3.font = 'Century Gothic Bold';
        text.selector3.fontSize = 80;
    },

    mainText : function(){
            
        text.title.setText("FOX");
        text.selector1.setText("Play");
        text.selector2.setText("Settings");
        text.selector3.setText("About");
    },

    saveText : function(){
            
        text.title.setText("SAVES");
        text.selector1.setText("Slot 1 - " + sav.slot1Chapter);
        text.selector2.setText("Slot 2 - " + sav.slot2Chapter);
        text.selector3.setText("Slot 3 - " + sav.slot3Chapter);
    },

    settingsText : function(){
            
        text.title.setText("SETTINGS");
        text.selector1.setText("Resolution - " + settings.resolutionWidth + " x " + settings.resolutionHeight);
        text.selector2.setText("Fullscreen - " + settings.fullscreenString);
        text.selector3.setText("Sound - " + settings.soundString);
    },

    soundUp : function(){

        settings.sound = settings.sound + 1;
    },

    soundDown : function(){

        settings.sound = settings.sound - 1;
    },

    exitSlot1 : function(){
        
        //Save
        store.set("save.slot1.chapter", "Prologue");
        MainMenu.prototype.exit();
    },

    exit : function(){

        //Clean Up
        menu.kill();
        text.title.destroy();
        text.selector1.destroy();
        text.selector2.destroy();
        text.selector3.destroy();
        
        //Start Game
        game.state.start('Game');
    },

    gofull : function(){

        //Scale Screen To Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.startFullScreen();
    }
};

//Jaxson C. Van Doorn, 2014
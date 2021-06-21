export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
        this.load.image('playbutton', './Assets/Menu/play_button.png')
        this.load.image('optionsbutton', './Assets/Menu/options_button.png')
        this.load.image('quitterbutton', './Assets/Menu/quitter_button.png')
        this.load.image('retourbutton', './Assets/Menu/retour_button.png')
        this.load.image('menu', './Assets/Menu/Main_Menu.png')
        this.load.image('options', './Assets/Menu/Options.png')
	}

    create() { //creating the menu screen

        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(762, 219, 'playbutton').setDepth(-1);

        let optionsButton = this.add.image(684 , 472, 'optionsbutton').setDepth(-1);

        let quitterButton = this.add.image(703 , 747, 'quitterbutton').setDepth(-1);
        
        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('sable');
        })

        optionsButton.setInteractive();

        optionsButton.on("pointerup", () => {
            this.scene.start('options');
        })

        quitterButton.setInteractive();

        quitterButton.on("pointerup", () => {
            this.scene.remove
        })
    }
}
export default class Options extends Phaser.Scene {
    constructor() {
        super('options')
    }

    preload()
	{
        this.load.image('retourbutton', './Assets/Menu/retour_button.png')
        this.load.image('options', './Assets/Menu/Options.png')
        this.load.image('menu', './Assets/Menu/Main_Menu.png')

	}

    create() { //creating the menu screen

        this.add.image(0, 0, 'options').setOrigin(0).setDepth(0);

        let retourButton = this.add.image(67 , 931, 'retourbutton').setDepth(-1);

        retourButton.setInteractive();

        retourButton.on("pointerup", () => {
            this.scene.start('menu');
        })
    }
}
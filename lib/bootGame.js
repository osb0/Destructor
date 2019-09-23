class bootGame extends Phaser.Scene{

	constructor(){
		super("BootGame");
	}

	preload(){
		this.load.image("landBackground", "assets/backgrounds/colored_land.png");
		this.load.atlasXML("tiles", "assets/spritesheet/spritesheet_tiles.png", "assets/spritesheet/spritesheet_tiles.xml");
		this.load.atlasXML("woods", "assets/spritesheet/spritesheet_wood.png", "assets/spritesheet/spritesheet_wood.xml");
		this.load.atlasXML("stones", "assets/spritesheet/spritesheet_stone.png", "assets/spritesheet/spritesheet_stone.xml");
		this.load.atlasXML("aliens", "assets/spritesheet/spritesheet_aliens.png", "assets/spritesheet/spritesheet_aliens.xml");
		this.load.atlasXML("explosives", "assets/spritesheet/spritesheet_explosive.png", "assets/spritesheet/spritesheet_explosive.xml");
		
	}

	create(){
		this.scene.start("PlayGame");
	}

}
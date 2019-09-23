class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		//Physics settings
		this.matter.world.setBounds(0,0,gameOptions.width, gameOptions.height);

		//Find the current level
		this.level = this.GetCurrentLevel();

		//Add Background
		this.addBackground();

		//Build Level
		this.buildLevel();
		this.base = this.add.sprite(250, 900, "explosives", "elementExplosive036.png");
		this.player = this.matter.add.gameObject(this.add.sprite(250, 830, "aliens", "alienPink_round.png")).setFrictionAir(0.001).setBounce(0.6);
		this.player.setStatic(true);

		//Events
		this.input.on("pointerdown", this.throwAlien, this);
	}

	throwAlien(e){
		var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, e);
		console.log(bodiesUnderPointer[0]);
		// if(bodiesUnderPointer > 0){
		// 	console.log(bodiesUnderPointer);
		// }
		//this.player.applyForce({x:1, y:0});
	}

	GetCurrentLevel(){
		return Level1;
	}

	addBackground(){
		this.add.tileSprite(0, 0, 1920, 1080, "landBackground").setOrigin(0,0);
	}

	buildLevel(){
		var ground = this.add.tileSprite(960, 1045, 1920, 70, "tiles", "grass.png");
		this.matter.add.gameObject(ground, {
			isStatic:true
		});

		var levelLenght = this.level.length;

		for(var i=0; i<levelLenght; i++){
			var locX 	= this.level[i][0];
			var locY 	= this.level[i][1];
			var sprite 	= this.level[i][2];
			var skin 	= this.level[i][3];
			var element	= this.add.sprite(locX, locY, sprite, skin);

			var object = this.matter.add.gameObject(element).setFrictionAir(0.001).setBounce(0.6);
		}
	}

}
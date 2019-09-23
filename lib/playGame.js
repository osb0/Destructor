class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		//Global variables
		this.dragging = false;
		this.canAlignMove = true;

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
		this.throwerLine = this.add.line(0, 0, this.player.x, this.player.y, this.base.x, this.base.y-this.base.height/2, 0x000000).setOrigin(0, 0);

		//Events
		this.input.on("pointerdown", this.pointAlien, this);
		this.input.on("pointerup", this.throwAlien, this);
		this.input.on("pointermove", this.dragTest, this);
	}

	dragTest(e){
		//Check the dragging
		if(this.canAlignMove && this.dragging){
			if(e.x > 45 && e.x < 250){
				this.player.x = e.x;
				this.throwerLine.setTo(e.x, this.player.y, this.base.x, this.base.y-this.base.height/2);
			}
			if(e.y > 665 && e.y < 970){
				this.player.y = e.y;
				this.throwerLine.setTo(this.player.x, e.y, this.base.x, this.base.y-this.base.height/2);
			}
		}
	}

	pointAlien(e){
		var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, e);

		if(bodiesUnderPointer.length){
			var alien = bodiesUnderPointer[0];
			if(alien.gameObject.body.id == this.player.body.id){
				this.dragging = true;
			}
		}
	}

	throwAlien(e){
		if(this.dragging){
			this.dragging = false;
			var difX = this.base.x - this.player.x;
			var difY = this.base.y - this.player.y - (this.base.height/2);
			this.player.setStatic(false);
			this.player.applyForce({x:difX/200, y:difY/200});
			this.throwerLine.alpha = 0;
		}
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

	update(){
		
	}
}
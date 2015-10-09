var ShapeLevelBuilder = (function() {
    return {
      scores: [0,0,0,0],
      initialLevels: [0,-1,-1,-1],
      defaultNumberOfRows: 3,
      defaultNumberOfCols: 3,
      '4': {
				level:4,
				draggableElements : {
					'count' : 6,
					'items' : 
					[
						{
						  'shape' : 'Circle_Object.png',
						  'type': 'Circle',							
					 	},
					 	{
						  'shape' : 'Rectangle_Object.png',
						  'type': 'Rectangle',							
					 	},
						{
						  'shape' : 'Square_Object.png',
						  'type': 'Square',							
					 	},
					 	{
						  'shape' : 'Ovel_Object.png',
						  'type': 'Ovel',							
					 	},
					 	{
						  'shape' : 'Pentagon_object.png',
						  'type': 'Pentagon',							
					 	},
					 	{
						  'shape' : 'Triangle_Object.png',
						  'type': 'Triangle',							
					 	}					 	
					]
				},
				centerElements : {
					'count' : 6,
					'items' : 
					[
						{
						  'shape' : 'Circle_Dot.png',
						  'type': 'Circle',							
					 	},
					 	{
						  'shape' : 'Triangle_Dot.png',
						  'type': 'Triangle',							
					 	},
					 	{
						  'shape' : 'Pentagon_Dot.png',
						  'type': 'Pentagon',							
					 	},
					 	{
						  'shape' : 'Ovel_Dot.png',
						  'type': 'Ovel',							
					 	},
					 	{
						  'shape' : 'Rectangle_Dot.png',
						  'type': 'Rectangle',							
					 	},
					 	{
						  'shape' : 'Square_Dot.png',
						  'type': 'Square',							
					 	},
					]
				},
				atlas:'level-object',				
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/Game_Play_Background_Level_03.png'
				}
			},
			'3': {
				level:3,
				draggableElements : {
					'count' : 6,
					'items' : 
					[
						{
						  'shape' : 'Circle_Color.png',
						  'type': 'Circle',							
					 	},
					 	{
						  'shape' : 'Rectangle_Color.png',
						  'type': 'Rectangle',							
					 	},
						{
						  'shape' : 'Square_Color.png',
						  'type': 'Square',							
					 	},
					 	{
						  'shape' : 'Ovel_Color.png',
						  'type': 'Ovel',							
					 	},
					 	{
						  'shape' : 'Pentagon_Color.png',
						  'type': 'Pentagon',							
					 	},
					 	{
						  'shape' : 'Triangle_Color.png',
						  'type': 'Triangle',							
					 	}					 	
					] 
				},
				centerElements : {
					'count' : 6,
					'items' : 
					[
						{
						  'shape' : 'Circle_Dot.png',
						  'type': 'Circle',							
					 	},
					 	{
						  'shape' : 'Triangle_Dot.png',
						  'type': 'Triangle',							
					 	},
					 	{
						  'shape' : 'Pentagon_Dot.png',
						  'type': 'Pentagon',							
					 	},
					 	{
						  'shape' : 'Ovel_Dot.png',
						  'type': 'Ovel',							
					 	},
					 	{
						  'shape' : 'Rectangle_Dot.png',
						  'type': 'Rectangle',							
					 	},
					 	{
						  'shape' : 'Square_Dot.png',
						  'type': 'Square',							
					 	},

					] 
				},
				atlas:'level-color',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/Game_Play_Background_Level_02.png'
				}
			},

			'2': {
				level:2,
				draggableElements : {
					'count' : 6,
					'items' : 
					[
						{
						  'shape' : 'Circle_Simple.png',
						  'type': 'Circle',							
					 	},
					 	{
						  'shape' : 'Rectangle_Simple.png',
						  'type': 'Rectangle',							
					 	},
						{
						  'shape' : 'Square_Simple.png',
						  'type': 'Square',							
					 	},
					 	{
						  'shape' : 'Ovel_Simple.png',
						  'type': 'Ovel',							
					 	},
					 	{
						  'shape' : 'Pentagon_Simple.png',
						  'type': 'Pentagon',							
					 	},
					 	{
						  'shape' : 'Triangle_Simple.png',
						  'type': 'Triangle',							
					 	}					 	
					] 
				},
				centerElements : {
					'count' : 6,
					'items' : 
					[
						{
						  'shape' : 'Circle_Dot.png',
						  'type': 'Circle',							
					 	},
					 	{
						  'shape' : 'Triangle_Dot.png',
						  'type': 'Triangle',							
					 	},
					 	{
						  'shape' : 'Pentagon_Dot.png',
						  'type': 'Pentagon',							
					 	},
					 	{
						  'shape' : 'Ovel_Dot.png',
						  'type': 'Ovel',							
					 	},
					 	{
						  'shape' : 'Rectangle_Dot.png',
						  'type': 'Rectangle',							
					 	},
					 	{
						  'shape' : 'Square_Dot.png',
						  'type': 'Square',							
					 	},

					] 
				},
				atlas: 'base-level',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/Game_Play_Background_Level_01.png'
				},
			},

			'1': {
				level:1,
				draggableElements : {
					'count' : 1,
					'items' : 
					[
						{
						  'shape' : 'Circle_Simple.png',
						  'type': 'Circle',							
					 	}				 	
					] 
				},
				centerElements : {
					'count' : 1,
					'items' : 
					[
						{
						  'shape' : 'Circle_Dot.png',
						  'type': 'Circle',							
					 	}
					] 
				},
				atlas: 'base-level',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/Game_Play_Background_Level_01.png'
				},
			},

      cols: function() {

        if(this.initialLevels.length < this.defaultNumberOfRows)
        {
          this.defaultNumberOfRows = this.initialLevels.length;
        }
        return this.defaultNumberOfRows;

      },

      rows: function() {

        return Math.ceil(this.initialLevels.length/this.cols());

      },
   };
}());

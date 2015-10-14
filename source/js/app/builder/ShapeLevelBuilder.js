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
						  'shape' : 'circle_object.png',
						  'type': 'circle',
					 	},
					 	{
						  'shape' : 'rectangle_object.png',
						  'type': 'rectangle',
					 	},
						{
						  'shape' : 'square_object.png',
						  'type': 'square',
					 	},
					 	{
						  'shape' : 'oval_object.png',
						  'type': 'oval',
					 	},
					 	{
						  'shape' : 'pentagon_object.png',
						  'type': 'pentagon',
					 	},
					 	{
						  'shape' : 'triangle_object.png',
						  'type': 'triangle',
					 	}
					]
				},
				centerElements : {
					'count' : 6,
					'items' :
					[
						{
						  'shape' : 'circle_dot.png',
						  'type': 'circle',
					 	},
					 	{
						  'shape' : 'triangle_dot.png',
						  'type': 'triangle',
					 	},
					 	{
						  'shape' : 'pentagon_dot.png',
						  'type': 'pentagon',
					 	},
					 	{
						  'shape' : 'oval_dot.png',
						  'type': 'oval',
					 	},
					 	{
						  'shape' : 'rectangle_dot.png',
						  'type': 'rectangle',
					 	},
					 	{
						  'shape' : 'square_dot.png',
						  'type': 'square',
					 	},
					]
				},
				atlas:'level-object',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/level_03_background.png'
				}
			},
			'3': {
				level:3,
				draggableElements : {
					'count' : 6,
					'items' :
					[
						{
						  'shape' : 'circle_color.png',
						  'type': 'circle',
					 	},
					 	{
						  'shape' : 'rectangle_color.png',
						  'type': 'rectangle',
					 	},
						{
						  'shape' : 'square_color.png',
						  'type': 'square',
					 	},
					 	{
						  'shape' : 'oval_color.png',
						  'type': 'oval',
					 	},
					 	{
						  'shape' : 'pentagon_color.png',
						  'type': 'pentagon',
					 	},
					 	{
						  'shape' : 'triangle_color.png',
						  'type': 'triangle',
					 	}
					]
				},
				centerElements : {
					'count' : 6,
					'items' :
					[
						{
						  'shape' : 'circle_dot.png',
						  'type': 'circle',
					 	},
					 	{
						  'shape' : 'triangle_dot.png',
						  'type': 'triangle',
					 	},
					 	{
						  'shape' : 'pentagon_dot.png',
						  'type': 'pentagon',
					 	},
					 	{
						  'shape' : 'oval_dot.png',
						  'type': 'oval',
					 	},
					 	{
						  'shape' : 'rectangle_dot.png',
						  'type': 'rectangle',
					 	},
					 	{
						  'shape' : 'square_dot.png',
						  'type': 'square',
					 	},

					]
				},
				atlas:'level-color',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/level_02_background.png'
				}
			},

			'2': {
				level:2,
				draggableElements : {
					'count' : 6,
					'items' :
					[
						{
						  'shape' : 'circle.png',
						  'type': 'circle',
					 	},
					 	{
						  'shape' : 'rectangle.png',
						  'type': 'rectangle',
					 	},
						{
						  'shape' : 'square.png',
						  'type': 'square',
					 	},
					 	{
						  'shape' : 'oval.png',
						  'type': 'oval',
					 	},
					 	{
						  'shape' : 'pentagon.png',
						  'type': 'pentagon',
					 	},
					 	{
						  'shape' : 'triangle.png',
						  'type': 'triangle',
					 	}
					]
				},
				centerElements : {
					'count' : 6,
					'items' :
					[
						{
						  'shape' : 'circle_dot.png',
						  'type': 'circle',
					 	},
					 	{
						  'shape' : 'triangle_dot.png',
						  'type': 'triangle',
					 	},
					 	{
						  'shape' : 'pentagon_dot.png',
						  'type': 'pentagon',
					 	},
					 	{
						  'shape' : 'oval_dot.png',
						  'type': 'oval',
					 	},
					 	{
						  'shape' : 'rectangle_dot.png',
						  'type': 'rectangle',
					 	},
					 	{
						  'shape' : 'square_dot.png',
						  'type': 'square',
					 	},

					]
				},
				atlas: 'base-level',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/level_01_background.png'
				},
			},

			'1': {
				level:1,
				draggableElements : {
					'count' : 1,
					'items' :
					[
						{
						  'shape' : 'circle.png',
						  'type': 'circle',
					 	}
					]
				},
				centerElements : {
					'count' : 1,
					'items' :
					[
						{
						  'shape' : 'circle_dot.png',
						  'type': 'circle',
					 	}
					]
				},
				atlas: 'base-level',
				backgroundImage: {
					'image': 'assets/level-info/match-shape/images/level_01_background.png'
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

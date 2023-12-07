const CRU = require('../CRU');

describe("Program Semantic testing of CRU", function(){
	
	beforeAll(function() {
		this.c = new CRU('GL02', '1,T1,P=20,H=ME 16:00-18:00,F1,S=M102')
	});
	
	it("can create a new CRU", function(){
		
		expect(this.c).toBeDefined();
		expect(this.c.ue).toBe("GL02");
		expect(this.c).toEqual(jasmine.objectContaining({ue: "GL02"}));
		
	});	
});
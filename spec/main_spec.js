"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("postcode and barcode convert test", function(){
    sinon.spy(console, 'log');

    it("when pass postcard", function(){

        var result = main(95713 );
        var expect_string = '|\t|:|::\t:|:|:\t|:::|\t:::||\t::||:\t:|:|:\t|';
        
        expect(expect_string).to.equal(result);
    });

    it("when pass barcode", function(){

        var result =  main('|\t:|:|:\t:|:|:\t:|:|:\t:|:|:\t:|:|:\t:::||\t::|:|\t::||:\t|:::|\t::|:|\t|');
        var expect_string = '55555-1237' ;
        expect(expect_string).to.equal(result);
    });
});
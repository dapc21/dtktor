/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var test = require('selenium-webdriver/testing'),
        webdriver = require('selenium-webdriver'),
        until = require('selenium-webdriver').until;

test.describe('Simple test', function () {
    var driver;
    
    test.before(function () {
        driver = new webdriver.Builder().forBrowser(webdriver.Browser.FIREFOX).build();
    });
    
    test.it('should find correct title', function () {
        driver.get("http://www.netbeans.org");
        // checking that page title contains word 'NetBeans'
        driver.wait(until.titleContains('NetBeans'), 1000);
    });
    
    test.after(function () {
        driver.quit();
    });
});

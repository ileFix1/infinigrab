const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require("selenium-webdriver/chrome");
const fs = require('fs')
const colors = require('colors')
const dateFormat = require('dateformat')
const package = require('./package.json')

console.clear()

DisplaySplash()
GetToken()

async function GetToken() {

    process.title = `Infinigen ${package.version} by ${package.author}`

    try {

        let options = new chrome.Options()
        options.excludeSwitches('enable-logging');
        driver = new Builder().forBrowser('chrome').withCapabilities(options).build();

        console.log('['.white + `${dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss TT")}`.cyan + '] '.white + 'Please Login in the opened Browser.'.red)
        await driver.get('https://discord.com/login')

        await driver.wait(until.urlIs('https://discord.com/app'))
        console.log('['.white + `${dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss TT")}`.cyan + '] '.white + 'Successfully signed in!'.green)

        var token = await fetchToken(driver)
        token = token.slice(1, -1)

        console.log('['.white + `${dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss TT")}`.cyan + '] '.white + 'Your Token is: '.green + token)

        fs.writeFileSync('Token.txt', 'Your Token is: ' + token)

        console.log('['.white + `${dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss TT")}`.cyan + '] '.white + 'Token is saved in'.green, 'Token.txt'.cyan)
        driver.quit()
        console.log('['.white + `${dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss TT")}`.cyan + '] '.white + 'Window closing after 5 sec.')
        setTimeout(function() { console.log('Closing!'.red); }, 5000);

    } catch {

        console.log('['.white + `${dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss TT")}`.cyan + '] '.white + 'Browser was closed unexpectedly!'.red, 'Please try again or close the console window!'.cyan)
        GetToken()

    }

}

async function fetchToken(driver) {

    var token = await driver.executeScript(function() {

        var iframe = document.createElement('iframe');
        var token

        iframe.onload = function() {
            var ifrLocalStorage = iframe.contentWindow.localStorage;
            token = ifrLocalStorage.getItem('token')
        };

        iframe.src = 'about:blank';
        document.body.appendChild(iframe);
        return token

    })

    return token

}

function DisplaySplash() {

    console.log(`\n\n
    ██╗███╗   ██╗███████╗██╗███╗   ██╗██╗ ██████╗ ██████╗  █████╗ ██████╗ 
    ██║████╗  ██║██╔════╝██║████╗  ██║██║██╔════╝ ██╔══██╗██╔══██╗██╔══██╗
    ██║██╔██╗ ██║█████╗  ██║██╔██╗ ██║██║██║  ███╗██████╔╝███████║██████╔╝
    ██║██║╚██╗██║██╔══╝  ██║██║╚██╗██║██║██║   ██║██╔══██╗██╔══██║██╔═══╝ 
    ██║██║ ╚████║██║     ██║██║ ╚████║██║╚██████╔╝██║  ██║██║  ██║██║     
    ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     

    ╔════════════════════════════════════════════════════════════════════╗
    ║                           by Ininitare                             ║ 
    ╚════════════════════════════════════════════════════════════════════╝\n\n`.cyan)

}
<p align="center"><img src="revshare-gh/icons/icon128.png"></p>

# Revshare for GitHub
A GitHub (Chrome) extension to implement revshare and Web Monetization based on repo stars.  
Made in JavaScript, August 2020 for [CS50](https://cs50.harvard.edu).  
Released under the [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).  
Created by [Kewbish](https://github.com/kewbish).   
Read [this blog post](https://kewbish.github.io/blog/posts/200816/).
If you found this project interesting, you may want to also look at [Revshare.js](https://github.com/kewbish/revshare).

## About
This project is an extension of the [Revshare.js](https://github.com/kewbish/revshare) project. Using the GitHub dependency and sponsorship API, it enables users to open a payment stream to GitHub project creators using the [Web Monetization](https://webmonetization.org/) ecosystem while on a repository's GitHub page.

If a payment pointer in the format `$[pointer]` is found in either the repository's FUNDING.yml or a random dependency's FUNDING.yml, Revshare for GitHub randomly chooses between repository creator / dependency funding, and from there, chooses a random payment pointer. It then inserts this pointer in a meta monetization tag, which enables payment streaming through [Coil](http://coil.com/).

## Installation
Clone this repository, and unzip. Navigate to `chrome://extensions`, and click load unpacked. Navigate to this `.crx` file, and load the extension.

> :warning: Note: this requires you to have the [Coil](http://coil.com/) extension loaded on your browser to stream payments. This extension merely loads funding links into a tag that's read by Coil. Payment processing is handled by Coil.

> :pencil: Note: I'm probably also not going to package this on the actual Chrome store. (tho if someone wants to donate the $5 developer account fee I'll package it :eyes: )

## Usage
Once installed, click the extension icon and fill in your [GitHub Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). This PAT should have the `repo` permission to access all the private repositories that you have access to.

## As a repo owner
If you'd like to add a funding link (and by extension the capability to be supported through this extension), simply add a wallet pointer to your FUNDING.yml file in your `.github` folder. More information is available [on the GitHub help page](https://docs.github.com/en/github/administering-a-repository/displaying-a-sponsor-button-in-your-repository). Creating a payment pointer can be handled through [Coil](https://coil.com); refer to [their documentation](https://coil.com/creator) for help creating and using one. Add this as a custom link in the FUNDING.yml file, and you should be good to go.

> :information_source: This also applies to dependencies. If a FUNDING.yml file is found and a payment pointer is found, the pointer can be detected.

## Acknowledgements
Thank you to [Aadi](https://github.com/aadibajpai) for the idea for this extension.  

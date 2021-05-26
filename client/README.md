#### Contents

| Description         | how to use                 | security                  |
| ------------------- | -------------------------- | ------------------------- |
| Project explanation | Development/end-user usage | how security is delt with |

# Itunes search

## Description

Another demonstration of how my skills as a developer have improved. The goal of this project is to build a working Itunes store search app with the use of a back-end that handles
the API calls. You can use this website to search for anything in the iTunes stores by entering a search term and a media selection.

## How to use

### Development

1. Clone the repository to your local manchine by using ```git clone "repo link"``` in the command line.
    ![clone](/git_images/clone.PNG)
  1.1 if you don't have git install use the following link: https://git-scm.com/downloads
2. To continue with development, all you need is to open the specified files with your favourite text editor or IDE.  
    ![open](/git_images/open.PNG)
    2.1 just remember to always when start with a nodejs project to run ```npm intall``` and ```npm run client-install``` in the back-end folder
    ![install](/git_images/install.PNG)
    2.2 if you don't have node installed please visit https://nodejs.org/en/download/
3. To test the product you can run ```npm test``` to run the exsisting tests.
    ![backEndTest](/git_images/back-end_test.PNG)
    ![frontEndTest](/git_images/front-end_test.PNG)

Visual Studio Code: https://code.visualstudio.com/download

### Using the product

1. Clone the repository to your local manchine by using ```git clone "repo link"``` in the command line.
    ![clone](/git_images/clone.PNG)
  1.1 if you don't have git install use the following link: https://git-scm.com/downloads
2. By using the command ```npm start``` after the intructions in the development section you will be able to start the program.

#### How it works:
    *On the first page there is a search bar when you enter a search term and select a media option then press search you will be able to search any item in the iTunes store.
    *In every item there is a favourites button that you can add a item to the list of favourites.
    *When clicking on the button of favourites you will be able to see the the list of item that you have added to it.
    *All the items also have a remove button so that you can remove the items from there.
    *By clicking the close favourites button you will be able to go back to the main search page.

### Security

    *All security is handle by Helmet that is used at the start of the application.
    *The end point does not require the use of an API key but the API calls are all still handle in the back-end of the application.

Deployed App link.
    ""
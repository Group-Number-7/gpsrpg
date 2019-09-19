To install: 

    Android:
        copy AndroidManifest.xml from root directory to path written at the top of the file
        run command "yarn" from root directory
    IOS:
        copy AppDelegate.m from root directory to path written at the top of the file
        cd ios, pod install, cd ..
        run "yarn"

New Change:
    Must use Yarn to install packages, since firebase doesn't work well with npm.
    Steps to use yarn:
        1) install yarn from their website
        2) in project, delete node modules folder and package-lock.json (not package.json)
        3) run "yarn" in the terminal
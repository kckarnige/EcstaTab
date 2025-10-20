import os
import sys
import shutil

curDir = os.path.dirname(__file__)


if os.path.isdir(os.path.join(curDir,"temp")):
    shutil.rmtree(os.path.join(curDir,"temp"))

if not os.path.isdir(os.path.join(curDir,"dist")):
    os.mkdir("dist")

shutil.copytree(os.path.join(curDir,"src"), os.path.join(curDir,"temp"))
os.remove(os.path.join(curDir,"temp","res","css","style.css.map"))
os.remove(os.path.join(curDir,"temp","res","css","style.scss"))
os.remove(os.path.join(curDir,"temp","res","heknows.png"))

if sys.argv[1] == "xpi":
    if os.path.exists("ecsta-firefox.zip"):
        os.remove("ecsta-firefox.zip")
    shutil.copy(os.path.join(curDir,"manifest.xpi.json"), os.path.join(curDir,"temp","manifest.json"))
    shutil.make_archive("ecsta-firefox", "zip", os.path.join(curDir,"temp"))
    shutil.move("ecsta-firefox.zip",os.path.join(curDir,"dist","ecsta-firefox.zip"))
    shutil.rmtree(os.path.join(curDir,"temp"))
    print('Built for Firefox! :D')
else:
    if sys.argv[1] == "crx":
        if os.path.exists("ecsta-chromium.zip"):
            os.remove("ecsta-chromium.zip")
        shutil.copy(os.path.join(curDir,"manifest.crx.json"), os.path.join(curDir,"temp","manifest.json"))
        shutil.make_archive("ecsta-chromium", "zip", os.path.join(curDir,"temp"))
        shutil.move("ecsta-chromium.zip",os.path.join(curDir,"dist","ecsta-chromium.zip"))
        shutil.rmtree(os.path.join(curDir,"temp"))
        print('Built for Chromium! :D')
    else:
        if sys.argv[1] == "both":
            if os.path.exists("ecsta-chromium.zip"):
                os.remove("ecsta-chromium.zip")
            if os.path.exists("ecsta-firefox.zip"):
                os.remove("ecsta-firefox.zip")
            shutil.copy(os.path.join(curDir,"manifest.crx.json"), os.path.join(curDir,"temp","manifest.json"))
            shutil.make_archive("ecsta-chromium", "zip", os.path.join(curDir,"temp"))
            shutil.move("ecsta-chromium.zip",os.path.join(curDir,"dist","ecsta-chromium.zip"))
            print('Chromium done..')
            shutil.copy(os.path.join(curDir,"manifest.xpi.json"), os.path.join(curDir,"temp","manifest.json"))
            shutil.make_archive("ecsta-firefox", "zip", os.path.join(curDir,"temp"))
            shutil.move("ecsta-firefox.zip",os.path.join(curDir,"dist","ecsta-firefox.zip"))
            shutil.rmtree(os.path.join(curDir,"temp"))
            print('Built for Firefox and Chromium! :D')
        else:
            shutil.rmtree(os.path.join(curDir,"temp"))
            print('Build failed')


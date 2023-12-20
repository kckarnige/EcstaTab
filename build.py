import os
import sys
import shutil

curDir = os.path.dirname(__file__)

if os.path.isdir(curDir+"\\temp"):
    shutil.rmtree(curDir+"\\temp")

if not os.path.isdir(curDir+"\\dist"):
    os.mkdir("dist")

shutil.copytree(curDir+"\\src", curDir+"\\temp")
os.remove(curDir+"\\temp\\res\\css\\style.css.map")
os.remove(curDir+"\\temp\\res\\css\\style.scss")
os.remove(curDir+"\\temp\\res\\heknows.png")

if sys.argv[1] == "xpi":
    if os.path.exists("ecsta-firefox.zip"):
        os.remove("ecsta-firefox.zip")
    shutil.copy(curDir+"\\manifest.xpi.json", curDir+"\\temp\\manifest.json")
    shutil.make_archive("ecsta-firefox", "zip", curDir+"\\temp")
    shutil.move("ecsta-firefox.zip",curDir+"\\dist\\ecsta-firefox.zip")
    shutil.rmtree(curDir+"\\temp")
    print('Built for Firefox! :D')
else:
    if sys.argv[1] == "crx":
        if os.path.exists("ecsta-chromium.zip"):
            os.remove("ecsta-chromium.zip")
        shutil.copy(curDir+"\\manifest.crx.json", curDir+"\\temp\\manifest.json")
        shutil.make_archive("ecsta-chromium", "zip", curDir+"\\temp")
        shutil.move("ecsta-chromium.zip",curDir+"\\dist\\ecsta-chromium.zip")
        shutil.rmtree(curDir+"\\temp")
        print('Built for Chromium! :D')
    else:
        shutil.rmtree(curDir+"\\temp")
        print('Build failed')


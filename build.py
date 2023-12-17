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
    if os.path.exists("ecsta-firefox.xpi"):
        os.remove("ecsta-firefox.xpi")
    shutil.copy(curDir+"\\manifest.xpi.json", curDir+"\\temp\\manifest.json")
    shutil.make_archive("ecsta-firefox", "zip", curDir+"\\temp")
    os.rename("ecsta-firefox.zip","ecsta-firefox.xpi")
    shutil.move("ecsta-firefox.xpi",curDir+"\\dist\\ecsta-firefox.xpi")
    shutil.rmtree(curDir+"\\temp")
    print('Built for Firefox! 🦊')
else:
    if sys.argv[1] == "crx":
        if os.path.exists("ecsta-chromium.zip"):
            os.remove("ecsta-chromium.zip")
        if os.path.exists("ecsta-chromium.crx"):
            os.remove("ecsta-chromium.crx")
        shutil.copy(curDir+"\\manifest.crx.json", curDir+"\\temp\\manifest.json")
        shutil.make_archive("ecsta-chromium", "zip", curDir+"\\temp")
        os.rename("ecsta-chromium.zip","ecsta-chromium.crx")
        shutil.move("ecsta-chromium.crx",curDir+"\\dist\\ecsta-chromium.crx")
        shutil.rmtree(curDir+"\\temp")
        print('Built for Chromium! 🌐')
    else:
        shutil.rmtree(curDir+"\\temp")
        print('Build failed')


# Please read the README.md file (in the root folder), before using this script 
# (to run this virus, go to output; there's the 'exe' type from this python virus)
import ctypes
import pyautogui as pag
import random
import time
import subprocess as sp
import os
import rotatescreen as rs
import keyboard
from plyer import notification
from playsound import playsound
from tkinter import messagebox 
import tkinter as tk
from PIL import ImageTk, Image

def spawnWindowClose():
   pass

def spawnWindow(x2, y2):
    window = tk.Tk()
    window.title("DISCOBALL.EXE IS COMING :)")
    window.geometry('%dx%d+%d+%d' % (400, 500, x2, y2))
    window.configure(background='grey')
    window.attributes('-topmost', True)
    window.protocol("WM_DELETE_WINDOW", spawnWindowClose)
    window.update()

    path = "main/disco_ball_wallpaper.jpg"

    img = ImageTk.PhotoImage(Image.open(path))

    panel = tk.Label(window, image = img)

    panel.pack(side = "bottom", fill = "both", expand = "yes")

    window.after(1000, window.destroy)
    window.mainloop()

def keyboardhack():
    if keyboard.read_key() == "y":
        notification.notify(
            title="Funny Video",
            message="Idiot tries to delete the discoball.exe virus (LOL). Watch the full video now on Youtube!",
            timeout=10
        )
        pag.typewrite("Your serious? Say hello to Youtube! LOL", interval=0.25)
    elif keyboard.read_key() == "n":
        pag.typewrite("Okay, then let's see your pc burn :)", interval=0.25)
    else:
        pag.typewrite("Haha! Your serious?", interval=0.25)

def run():
    print("Virus passed.")
    SPI_SETDESKWALLPAPER = 0x14
    SPIF_UPDATEINFILE = 0x2
    ctypes.windll.user32.SystemParametersInfoA(SPI_SETDESKWALLPAPER, 0, "" , SPIF_UPDATEINFILE)
    pag.FAILSAFE = True
    display = rs.get_primary_display()
    ICON_PATH = "main/discoball_logo.png"
    sp.Popen(["notepad.exe", "discoball.txt"])
    time.sleep(2)
    pag.typewrite("Your keyboard is also hacked :). Do you want to destroy this virus? (y or n)\n", interval=0.25)
    keyboardhack()
    playsound("ohohdiscoball.mp3")
    sp.Popen(["C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "https://www.bing.com/search?PC=U523&q=how+to+get+rid+of+the+discoball.exe+virus&FORM=ANAB01"])
    sp.call("TASKKILL /F /IM notepad.exe", shell=True)
    notification.notify(
        title="⚠️ALERT⚠️",
        message="More than 10.000 people are infected with discoball.exe. Please don't download anything from the web, because it can infect your pc. Read more...",
        timeout=10
    )
    playsound("virus_music.mp3")
    sp.Popen(["C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "https://www.bing.com/search?pglt=675&PC=U523&q=help+me+please+i+need+help&FORM=ANSPA1"])
    playsound("virus_music.mp3")
    display.rotate_to(180)
    playsound("virus_music.mp3")
    sp.Popen(["C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "https://www.bing.com/search?pglt=675&PC=U523&q=discoball.exe+is+here+to+take+down+your+pc...&FORM=ANNTA1"])
    time.sleep(10)
    for i in range(1, 10):
        x = random.randint(900,1500)
        y = random.randint(400,800)
        pag.moveTo(x, y, 0.2)
        x2 = random.randint(900,1500)
        y2 = random.randint(400,800)
        spawnWindow(x2,y2)
        time.sleep(0.2)
    #os.system("shutdown /s /t 0") # DETONATOR (edit made by emielsterdev 2026)
    
    

def quitvirus():
    messagebox.showinfo("Succeed.","Succesfully canceled the virus. You can delete this file, to make sure you don't press it accidentally again.", icon="info")


warning1 = messagebox.askquestion("VIRUS ALERT", "This malware is no joke, it can destroy your entire pc. Run it? (THE CREATOR IS NOT RESPONSIBLE)", icon="warning")
if warning1 == "yes":
    warning2 = messagebox.askquestion("LAST VIRUS ALERT","THIS IS THE LAST WARNING!! THE CREATOR IS NOT RESPONSIBLE FOR THIS!!!! ONLY TRY THIS ON A VIRUAL MACHINE!!", icon="warning")
    if warning2 == "yes":
        run()
    elif warning2 == "no":
        quitvirus()
elif warning1 == "no":
    quitvirus()
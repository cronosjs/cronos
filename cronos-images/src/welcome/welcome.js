const Canvas = require("canvas");

module.exports = class welcome {
async def welcomeimage(request):
        print(request)
        args = await getarg(request)
        back = request.query.get("background")
        print(back)
        av = request.query.get("av")
        print(av)
        response = requests.get(back) 
        image_bytes = io.BytesIO(response.content)
        base = Image.open(image_bytes).resize((1024 ,500))
        canvas = ImageDraw.Draw(base)
        font =  ImageFont.truetype('Uni-Sans-Heavy.otf', size=40 )
        welfont =  ImageFont.truetype('Uni-Sans-Heavy.otf', size=80 )
        response1 = requests.get(av) 
        image_bytes1 = io.BytesIO(response1.content)
        pfp = Image.open(image_bytes1).convert('RGB')
        canvas.ellipse((379, 42, 644, 307), (255, 255, 255))
        avatar = pfp.resize((250,250)).convert('RGBA')
        mask = Image.new('L', (250,250), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + (250,250), fill=255)
        mask = mask.resize(avatar.size, Image.ANTIALIAS)
        avatar.putalpha(mask)
        base.paste(avatar, (387,50), avatar)
        text =  args[1][0]
        w,h = canvas.textsize(text, font = font)
        canvas.text(((1024-w)/2, 390), text, (255, 255, 255), font = font)
        canvas.text((325, 325), "WELCOME", fill='#FFFFFF', font = welfont)
        base = base.convert('RGB')
}
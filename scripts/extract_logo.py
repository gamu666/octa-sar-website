from pathlib import Path

from PIL import Image


root = Path(__file__).resolve().parents[1]
source = Image.open(root / "public" / "brand" / "octa-sar-source.png").convert("RGB")

# Exact emblem crop from the user's light-background logo variant.
crop = source.crop((548, 84, 806, 342))
alpha = Image.eval(crop.convert("L"), lambda luminance: 255 - luminance)
mark = Image.new("RGBA", crop.size, (17, 19, 18, 255))
mark.putalpha(alpha)
mark = mark.resize((1032, 1032), Image.Resampling.LANCZOS)
mark.save(root / "public" / "brand" / "octa-sar-mark.png", optimize=True)

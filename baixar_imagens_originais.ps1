$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $MyInvocation.MyCommand.Path
$index = Join-Path $site 'index.html'
$stream = 'netflix','prime-video','hbo-max','disney-plus','globoplay','apple-tv','paramount-plus','crunchyroll','telecine-play','premiere'
$platforms = [ordered]@{
 'amazon-firetv'='https://maxplayer.tv/images/platforms/icon-amazon-firetv.webp';
 'android-tv'='https://maxplayer.tv/images/platforms/icon-android-tv.webp';
 'lg-webos'='https://maxplayer.tv/images/platforms/icon-lg-webos.webp';
 'samsung-tizen'='https://maxplayer.tv/images/platforms/icon-samsung-tizen.webp';
 'windows'='https://maxplayer.tv/images/platforms/icon-windows.webp';
 'ios'='https://maxplayer.tv/images/platforms/icon-ios.webp';
 'android-mobile'='https://maxplayer.tv/images/store/googleplay-dark.webp';
 'mag-box'='https://maxplayer.tv/images/platforms/icon-mag-box.webp';
 'apple-tv'='https://maxplayer.tv/images/platforms/icon-apple-tv.svg';
 'roku'='https://maxplayer.tv/images/platforms/icon-roku.webp'
}
New-Item -ItemType Directory -Force -Path (Join-Path $site 'assets/streaming'),(Join-Path $site 'assets/platforms') | Out-Null
$downloaded = 0
$failed = 0
$records = @()
foreach ($s in $stream) {
 $u = "https://raw.githubusercontent.com/SimsReaper/PP/main/assets/streaming/$s.webp"
 $f = Join-Path $site "assets/streaming/$s.webp"
 try { Invoke-WebRequest -Uri $u -OutFile $f -UseBasicParsing -TimeoutSec 30; $downloaded++;
       $records += [pscustomobject]@{ Remote=$u; Local="assets/streaming/$s.webp" };
       Write-Host "OK $s.webp" }
 catch { $failed++; Write-Warning "Falha no download: $u ($($_.Exception.Message))"; if(Test-Path $f){Remove-Item $f -ErrorAction SilentlyContinue} }
}
foreach($name in $platforms.Keys) {
 $u=$platforms[$name]; $ext=[IO.Path]::GetExtension(($u -split '\?')[0]);
 $f=Join-Path $site "assets/platforms/original-$name$ext"
 try { Invoke-WebRequest -Uri $u -OutFile $f -UseBasicParsing -TimeoutSec 30; $downloaded++;
       $records += [pscustomobject]@{ Remote=$u; Local="assets/platforms/original-$name$ext" };
       Write-Host "OK original-$name$ext" }
 catch { $failed++; Write-Warning "Falha no download: $u ($($_.Exception.Message))"; if(Test-Path $f){Remove-Item $f -ErrorAction SilentlyContinue} }
}
if ($records.Count) {
 $html = [IO.File]::ReadAllText($index, [Text.Encoding]::UTF8)
 foreach($r in $records){ $html=$html.Replace($r.Remote,$r.Local) }
 [IO.File]::WriteAllText($index,$html,[Text.UTF8Encoding]::new($false))
}
Write-Host "Download concluido. Imagens: $downloaded / 20; falhas: $failed"
Write-Host 'Os links que falharam continuam remotos no HTML. Abra index.html para testar.'

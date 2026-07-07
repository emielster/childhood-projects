@echo off
where rustup >nul 2>nul
if %errorlevel% equ 0 (
    echo [1/3] Rustup is installed!
) else (
    echo "Rust is not installed (Advanced: Rustup), please install it before running the run script."
)

where cargo >nul 2>nul
if %errorlevel% equ 0 (
    echo [2/3] Cargo is installed! 
) else (
    echo "Rust is not installed (Advanced: Cargo), please install it before running the script."
)

where qemu-system-x86_64 >nul 2>nul
if %errorlevel% equ 0 (
    echo [3/3] QEMU is installed!
) else (
    echo "QEMU is not installed, please install it befoer running the script."
)
echo [+] Installing the Flexible Water Operating System!
rustup target add thumbv7em-none-eabihf
cargo build --target thumbv7em-none-eabihf
rustup component add rust-src
cargo +nightly build --target x86_64-fwos.json
cargo install bootimage
rustup component add llvm-tools-preview
cargo bootimage
mkdir %USERPROFILE%\.fwos\bin
copy fwos.bat %USERPROFILE%\.fwos\bin
copy fwos.bat %USERPROFILE%\fwos.bat
endlocal



echo Succesfully installed the Flexible Water Operating System! (Use 'fwos' to run the operating system)
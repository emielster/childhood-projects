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
echo [+] Repairing the FWOS!
rustup target add thumbv7em-none-eabihf
cargo build --target thumbv7em-none-eabihf
rustup component add rust-src
cargo +nightly build --target x86_64-fwos.json
echo [+] Reinstalling bootimage... 
cargo install bootimage
rustup component add llvm-tools-preview
cargo bootimage
echo [+] Testing... (Normally, it should work...)
cargo run 
echo [$] Operating System has succesfully been repaired!
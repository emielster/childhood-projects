org 0x7C00

mov ah, 0x0e



print:
    mov bx, [hello]
  
    mov al, [bx]
    inc bx
    cmp bx, 0
    je exit

    
    int 0x10 ; stops print mode.
    jmp print

exit:
    jmp $
hello: db 'Hello, World!', 0

times 510-($-$$) db 0
db 0x55, 0xaa
# Trivy Docker Image Scan Report
Generated at: 2025-11-27 20:55:50.917534139 +0530 IST m=+0.758218467

---
## Image: flask-react-template (ubuntu 22.04)

> Reference: `flask-react-template (ubuntu 22.04)`
### Vulnerabilities
| Package | Vulnerability | Severity | Installed | Fixed | Title |
|---------|---------------|----------|-----------|-------|-------|
| binutils | CVE-2025-1180 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld elf-eh-frame.c _bfd_elf_write_section_eh_frame memory corruption |
| binutils | CVE-2025-11839 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils prdbg.c tg_tag_type return value |
| binutils | CVE-2025-11840 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils out-of-bounds read |
| binutils | CVE-2017-13716 | LOW | 2.38-4ubuntu2.10 |  | binutils: Memory leak with the C++ symbol demangler routine in libiberty |
| binutils | CVE-2019-1010204 | LOW | 2.38-4ubuntu2.10 |  | binutils: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read in gold/fileread.cc and elfcpp/elfcpp_file.h leads to denial of service |
| binutils | CVE-2022-27943 | LOW | 2.38-4ubuntu2.10 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| binutils | CVE-2022-48064 | LOW | 2.38-4ubuntu2.10 |  | binutils: excessive memory consumption in _bfd_dwarf2_find_nearest_line_with_alt() in dwarf2.c |
| binutils | CVE-2025-1152 | LOW | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld xstrdup.c xstrdup memory leak |
| binutils-common | CVE-2025-1180 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld elf-eh-frame.c _bfd_elf_write_section_eh_frame memory corruption |
| binutils-common | CVE-2025-11839 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils prdbg.c tg_tag_type return value |
| binutils-common | CVE-2025-11840 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils out-of-bounds read |
| binutils-common | CVE-2017-13716 | LOW | 2.38-4ubuntu2.10 |  | binutils: Memory leak with the C++ symbol demangler routine in libiberty |
| binutils-common | CVE-2019-1010204 | LOW | 2.38-4ubuntu2.10 |  | binutils: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read in gold/fileread.cc and elfcpp/elfcpp_file.h leads to denial of service |
| binutils-common | CVE-2022-27943 | LOW | 2.38-4ubuntu2.10 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| binutils-common | CVE-2022-48064 | LOW | 2.38-4ubuntu2.10 |  | binutils: excessive memory consumption in _bfd_dwarf2_find_nearest_line_with_alt() in dwarf2.c |
| binutils-common | CVE-2025-1152 | LOW | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld xstrdup.c xstrdup memory leak |
| binutils-x86-64-linux-gnu | CVE-2025-1180 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld elf-eh-frame.c _bfd_elf_write_section_eh_frame memory corruption |
| binutils-x86-64-linux-gnu | CVE-2025-11839 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils prdbg.c tg_tag_type return value |
| binutils-x86-64-linux-gnu | CVE-2025-11840 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils out-of-bounds read |
| binutils-x86-64-linux-gnu | CVE-2017-13716 | LOW | 2.38-4ubuntu2.10 |  | binutils: Memory leak with the C++ symbol demangler routine in libiberty |
| binutils-x86-64-linux-gnu | CVE-2019-1010204 | LOW | 2.38-4ubuntu2.10 |  | binutils: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read in gold/fileread.cc and elfcpp/elfcpp_file.h leads to denial of service |
| binutils-x86-64-linux-gnu | CVE-2022-27943 | LOW | 2.38-4ubuntu2.10 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| binutils-x86-64-linux-gnu | CVE-2022-48064 | LOW | 2.38-4ubuntu2.10 |  | binutils: excessive memory consumption in _bfd_dwarf2_find_nearest_line_with_alt() in dwarf2.c |
| binutils-x86-64-linux-gnu | CVE-2025-1152 | LOW | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld xstrdup.c xstrdup memory leak |
| coreutils | CVE-2016-2781 | LOW | 8.32-4.1ubuntu1.2 |  | coreutils: Non-privileged session can escape to the parent session in chroot |
| cpp-11 | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| cpp-11 | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| cpp-11 | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| curl | CVE-2025-0167 | LOW | 7.81.0-1ubuntu1.21 |  | When asked to use a `.netrc` file for credentials **and** to follow HT ... |
| curl | CVE-2025-9086 | LOW | 7.81.0-1ubuntu1.21 |  | curl: libcurl: Curl out of bounds read for cookie path |
| dbus | CVE-2023-34969 | LOW | 1.12.20-2ubuntu4.1 |  | dbus: dbus-daemon: assertion failure when a monitor is active and a message from the driver cannot be delivered |
| dbus-user-session | CVE-2023-34969 | LOW | 1.12.20-2ubuntu4.1 |  | dbus: dbus-daemon: assertion failure when a monitor is active and a message from the driver cannot be delivered |
| dirmngr | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| g++-11 | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| g++-11 | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| g++-11 | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| gcc-11 | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| gcc-11 | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| gcc-11 | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| gcc-11-base | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| gcc-11-base | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| gcc-11-base | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| gcc-12-base | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| git | CVE-2024-52005 | MEDIUM | 1:2.34.1-1ubuntu1.15 |  | git: The sideband payload is passed unfiltered to the terminal in git |
| git-man | CVE-2024-52005 | MEDIUM | 1:2.34.1-1ubuntu1.15 |  | git: The sideband payload is passed unfiltered to the terminal in git |
| gnupg | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gnupg-l10n | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gnupg-utils | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpg | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpg-agent | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpg-wks-client | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpg-wks-server | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpgconf | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpgsm | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| gpgv | CVE-2022-3219 | LOW | 2.2.27-3ubuntu2.4 |  | gnupg: denial of service issue (resource consumption) using compressed packets |
| libasan6 | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| libasan6 | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| libasan6 | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libatomic1 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libavahi-client3 | CVE-2024-52615 | LOW | 0.8-5ubuntu5.2 |  | avahi: Avahi Wide-Area DNS Uses Constant Source Port |
| libavahi-client3 | CVE-2024-52616 | LOW | 0.8-5ubuntu5.2 |  | avahi: Avahi Wide-Area DNS Predictable Transaction IDs |
| libavahi-common-data | CVE-2024-52615 | LOW | 0.8-5ubuntu5.2 |  | avahi: Avahi Wide-Area DNS Uses Constant Source Port |
| libavahi-common-data | CVE-2024-52616 | LOW | 0.8-5ubuntu5.2 |  | avahi: Avahi Wide-Area DNS Predictable Transaction IDs |
| libavahi-common3 | CVE-2024-52615 | LOW | 0.8-5ubuntu5.2 |  | avahi: Avahi Wide-Area DNS Uses Constant Source Port |
| libavahi-common3 | CVE-2024-52616 | LOW | 0.8-5ubuntu5.2 |  | avahi: Avahi Wide-Area DNS Predictable Transaction IDs |
| libbinutils | CVE-2025-1180 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld elf-eh-frame.c _bfd_elf_write_section_eh_frame memory corruption |
| libbinutils | CVE-2025-11839 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils prdbg.c tg_tag_type return value |
| libbinutils | CVE-2025-11840 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils out-of-bounds read |
| libbinutils | CVE-2017-13716 | LOW | 2.38-4ubuntu2.10 |  | binutils: Memory leak with the C++ symbol demangler routine in libiberty |
| libbinutils | CVE-2019-1010204 | LOW | 2.38-4ubuntu2.10 |  | binutils: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read in gold/fileread.cc and elfcpp/elfcpp_file.h leads to denial of service |
| libbinutils | CVE-2022-27943 | LOW | 2.38-4ubuntu2.10 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libbinutils | CVE-2022-48064 | LOW | 2.38-4ubuntu2.10 |  | binutils: excessive memory consumption in _bfd_dwarf2_find_nearest_line_with_alt() in dwarf2.c |
| libbinutils | CVE-2025-1152 | LOW | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld xstrdup.c xstrdup memory leak |
| libcairo-gobject2 | CVE-2017-7475 | LOW | 1.16.0-5ubuntu2 |  | cairo: NULL pointer dereference with a crafted font file |
| libcairo-gobject2 | CVE-2018-18064 | LOW | 1.16.0-5ubuntu2 |  | cairo: Stack-based buffer overflow via parsing of crafted WebKitGTK+ document |
| libcairo-gobject2 | CVE-2019-6461 | LOW | 1.16.0-5ubuntu2 |  | cairo: assertion problem in _cairo_arc_in_direction in cairo-arc.c |
| libcairo2 | CVE-2017-7475 | LOW | 1.16.0-5ubuntu2 |  | cairo: NULL pointer dereference with a crafted font file |
| libcairo2 | CVE-2018-18064 | LOW | 1.16.0-5ubuntu2 |  | cairo: Stack-based buffer overflow via parsing of crafted WebKitGTK+ document |
| libcairo2 | CVE-2019-6461 | LOW | 1.16.0-5ubuntu2 |  | cairo: assertion problem in _cairo_arc_in_direction in cairo-arc.c |
| libcc1-0 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libctf-nobfd0 | CVE-2025-1180 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld elf-eh-frame.c _bfd_elf_write_section_eh_frame memory corruption |
| libctf-nobfd0 | CVE-2025-11839 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils prdbg.c tg_tag_type return value |
| libctf-nobfd0 | CVE-2025-11840 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils out-of-bounds read |
| libctf-nobfd0 | CVE-2017-13716 | LOW | 2.38-4ubuntu2.10 |  | binutils: Memory leak with the C++ symbol demangler routine in libiberty |
| libctf-nobfd0 | CVE-2019-1010204 | LOW | 2.38-4ubuntu2.10 |  | binutils: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read in gold/fileread.cc and elfcpp/elfcpp_file.h leads to denial of service |
| libctf-nobfd0 | CVE-2022-27943 | LOW | 2.38-4ubuntu2.10 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libctf-nobfd0 | CVE-2022-48064 | LOW | 2.38-4ubuntu2.10 |  | binutils: excessive memory consumption in _bfd_dwarf2_find_nearest_line_with_alt() in dwarf2.c |
| libctf-nobfd0 | CVE-2025-1152 | LOW | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld xstrdup.c xstrdup memory leak |
| libctf0 | CVE-2025-1180 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld elf-eh-frame.c _bfd_elf_write_section_eh_frame memory corruption |
| libctf0 | CVE-2025-11839 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils prdbg.c tg_tag_type return value |
| libctf0 | CVE-2025-11840 | MEDIUM | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils out-of-bounds read |
| libctf0 | CVE-2017-13716 | LOW | 2.38-4ubuntu2.10 |  | binutils: Memory leak with the C++ symbol demangler routine in libiberty |
| libctf0 | CVE-2019-1010204 | LOW | 2.38-4ubuntu2.10 |  | binutils: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read in gold/fileread.cc and elfcpp/elfcpp_file.h leads to denial of service |
| libctf0 | CVE-2022-27943 | LOW | 2.38-4ubuntu2.10 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libctf0 | CVE-2022-48064 | LOW | 2.38-4ubuntu2.10 |  | binutils: excessive memory consumption in _bfd_dwarf2_find_nearest_line_with_alt() in dwarf2.c |
| libctf0 | CVE-2025-1152 | LOW | 2.38-4ubuntu2.10 |  | binutils: GNU Binutils ld xstrdup.c xstrdup memory leak |
| libcurl3-gnutls | CVE-2025-0167 | LOW | 7.81.0-1ubuntu1.21 |  | When asked to use a `.netrc` file for credentials **and** to follow HT ... |
| libcurl3-gnutls | CVE-2025-9086 | LOW | 7.81.0-1ubuntu1.21 |  | curl: libcurl: Curl out of bounds read for cookie path |
| libcurl4 | CVE-2025-0167 | LOW | 7.81.0-1ubuntu1.21 |  | When asked to use a `.netrc` file for credentials **and** to follow HT ... |
| libcurl4 | CVE-2025-9086 | LOW | 7.81.0-1ubuntu1.21 |  | curl: libcurl: Curl out of bounds read for cookie path |
| libdbus-1-3 | CVE-2023-34969 | LOW | 1.12.20-2ubuntu4.1 |  | dbus: dbus-daemon: assertion failure when a monitor is active and a message from the driver cannot be delivered |
| libdw1 | CVE-2025-1352 | LOW | 0.186-1ubuntu0.1 |  | elfutils: GNU elfutils eu-readelf libdw_alloc.c __libdw_thread_tail memory corruption |
| libdw1 | CVE-2025-1376 | LOW | 0.186-1ubuntu0.1 |  | elfutils: GNU elfutils eu-strip elf_strptr.c elf_strptr denial of service |
| libelf1 | CVE-2025-1352 | LOW | 0.186-1ubuntu0.1 |  | elfutils: GNU elfutils eu-readelf libdw_alloc.c __libdw_thread_tail memory corruption |
| libelf1 | CVE-2025-1376 | LOW | 0.186-1ubuntu0.1 |  | elfutils: GNU elfutils eu-strip elf_strptr.c elf_strptr denial of service |
| libgcc-11-dev | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| libgcc-11-dev | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| libgcc-11-dev | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libgcc-s1 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libgcrypt20 | CVE-2024-2236 | LOW | 1.9.4-3ubuntu3 |  | libgcrypt: vulnerable to Marvin Attack |
| libgomp1 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libicu70 | CVE-2025-5222 | LOW | 70.1-2 |  | icu: Stack buffer overflow in the SRBRoot::addTag function |
| libitm1 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| liblsan0 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libncurses6 | CVE-2023-50495 | LOW | 6.3-2ubuntu0.1 |  | ncurses: segmentation fault via _nc_wrap_entry() |
| libncursesw6 | CVE-2023-50495 | LOW | 6.3-2ubuntu0.1 |  | ncurses: segmentation fault via _nc_wrap_entry() |
| libnss-systemd | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| libpam-modules | CVE-2025-8941 | MEDIUM | 1.4.0-11ubuntu2.6 |  | linux-pam: Incomplete fix for CVE-2025-6020 |
| libpam-modules-bin | CVE-2025-8941 | MEDIUM | 1.4.0-11ubuntu2.6 |  | linux-pam: Incomplete fix for CVE-2025-6020 |
| libpam-runtime | CVE-2025-8941 | MEDIUM | 1.4.0-11ubuntu2.6 |  | linux-pam: Incomplete fix for CVE-2025-6020 |
| libpam-systemd | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| libpam0g | CVE-2025-8941 | MEDIUM | 1.4.0-11ubuntu2.6 |  | linux-pam: Incomplete fix for CVE-2025-6020 |
| libpcre16-3 | CVE-2017-11164 | LOW | 2:8.39-13ubuntu0.22.04.1 |  | pcre: OP_KETRMAX feature in the match function in pcre_exec.c |
| libpcre2-16-0 | CVE-2022-41409 | LOW | 10.39-3ubuntu0.1 |  | pcre2: negative repeat value in a pcre2test subject line leads to inifinite loop |
| libpcre2-32-0 | CVE-2022-41409 | LOW | 10.39-3ubuntu0.1 |  | pcre2: negative repeat value in a pcre2test subject line leads to inifinite loop |
| libpcre2-8-0 | CVE-2022-41409 | LOW | 10.39-3ubuntu0.1 |  | pcre2: negative repeat value in a pcre2test subject line leads to inifinite loop |
| libpcre2-dev | CVE-2022-41409 | LOW | 10.39-3ubuntu0.1 |  | pcre2: negative repeat value in a pcre2test subject line leads to inifinite loop |
| libpcre2-posix3 | CVE-2022-41409 | LOW | 10.39-3ubuntu0.1 |  | pcre2: negative repeat value in a pcre2test subject line leads to inifinite loop |
| libpcre3 | CVE-2017-11164 | LOW | 2:8.39-13ubuntu0.22.04.1 |  | pcre: OP_KETRMAX feature in the match function in pcre_exec.c |
| libpcre3-dev | CVE-2017-11164 | LOW | 2:8.39-13ubuntu0.22.04.1 |  | pcre: OP_KETRMAX feature in the match function in pcre_exec.c |
| libpcre32-3 | CVE-2017-11164 | LOW | 2:8.39-13ubuntu0.22.04.1 |  | pcre: OP_KETRMAX feature in the match function in pcre_exec.c |
| libpcrecpp0v5 | CVE-2017-11164 | LOW | 2:8.39-13ubuntu0.22.04.1 |  | pcre: OP_KETRMAX feature in the match function in pcre_exec.c |
| libpixman-1-0 | CVE-2023-37769 | MEDIUM | 0.40.0-1ubuntu0.22.04.1 |  | stress-test master commit e4c878 was discovered to contain a FPE vulne ... |
| libpolkit-agent-1-0 | CVE-2016-2568 | LOW | 0.105-33 |  | polkit: Program run via pkexec as unprivileged user can escape to parent session via TIOCSTI ioctl |
| libpolkit-gobject-1-0 | CVE-2016-2568 | LOW | 0.105-33 |  | polkit: Program run via pkexec as unprivileged user can escape to parent session via TIOCSTI ioctl |
| libpython3.10 | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| libpython3.10 | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| libpython3.10-dev | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| libpython3.10-dev | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| libpython3.10-minimal | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| libpython3.10-minimal | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| libpython3.10-stdlib | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| libpython3.10-stdlib | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| libquadmath0 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libssl3 | CVE-2024-41996 | LOW | 3.0.2-0ubuntu1.20 |  | openssl: remote attackers (from the client side) to trigger unnecessarily expensive server-side DHE modular-exponentiation calculations |
| libstdc++-11-dev | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| libstdc++-11-dev | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| libstdc++-11-dev | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libstdc++6 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libsystemd0 | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| libtinfo6 | CVE-2023-50495 | LOW | 6.3-2ubuntu0.1 |  | ncurses: segmentation fault via _nc_wrap_entry() |
| libtsan0 | CVE-2021-3826 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | libiberty: Heap/stack buffer overflow in the dlang_lname function in d-demangle.c |
| libtsan0 | CVE-2021-46195 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | gcc: uncontrolled recursion in libiberty/rust-demangle.c |
| libtsan0 | CVE-2022-27943 | LOW | 11.4.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libubsan1 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.2 |  | binutils: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack exhaustion in demangle_const |
| libudev1 | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| libzstd1 | CVE-2022-4899 | LOW | 1.4.8+dfsg-3build1 |  | zstd: mysql: buffer overrun in util.c |
| linux-libc-dev | CVE-2024-35870 | HIGH | 5.15.0-161.171 |  | kernel: smb: client: fix UAF in smb2_reconnect_server() |
| linux-libc-dev | CVE-2024-53179 | HIGH | 5.15.0-161.171 |  | kernel: smb: client: fix use-after-free of signing key |
| linux-libc-dev | CVE-2025-38118 | HIGH | 5.15.0-161.171 |  | kernel: Bluetooth: MGMT: Fix UAF on mgmt_remove_adv_monitor_complete |
| linux-libc-dev | CVE-2013-7445 | MEDIUM | 5.15.0-161.171 |  | kernel: memory exhaustion via crafted Graphics Execution Manager (GEM) objects |
| linux-libc-dev | CVE-2015-7837 | MEDIUM | 5.15.0-161.171 |  | kernel: securelevel disabled after kexec |
| linux-libc-dev | CVE-2015-8553 | MEDIUM | 5.15.0-161.171 |  | xen: non-maskable interrupts triggerable by guests (xsa120) |
| linux-libc-dev | CVE-2016-8660 | MEDIUM | 5.15.0-161.171 |  | kernel: xfs: local DoS due to a page lock order bug in the XFS seek hole/data implementation |
| linux-libc-dev | CVE-2018-17977 | MEDIUM | 5.15.0-161.171 |  | kernel: Mishandled interactions among XFRM Netlink messages, IPPROTO_AH packets, and IPPROTO_IP packets resulting in a denial of service |
| linux-libc-dev | CVE-2019-15794 | MEDIUM | 5.15.0-161.171 |  | kernel: Overlayfs in the Linux kernel and shiftfs  not restoring original value on error leading to a refcount underflow |
| linux-libc-dev | CVE-2020-14356 | MEDIUM | 5.15.0-161.171 |  | kernel: Use After Free vulnerability in cgroup BPF component |
| linux-libc-dev | CVE-2021-3714 | MEDIUM | 5.15.0-161.171 |  | kernel: Remote Page Deduplication Attacks |
| linux-libc-dev | CVE-2021-3864 | MEDIUM | 5.15.0-161.171 |  | kernel: descendant's dumpable setting with certain SUID binaries |
| linux-libc-dev | CVE-2021-4095 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: NULL pointer dereference in kvm_dirty_ring_get() in virt/kvm/dirty_ring.c |
| linux-libc-dev | CVE-2021-47432 | MEDIUM | 5.15.0-161.171 |  | kernel: lib/generic-radix-tree.c: Don't overflow in peek() |
| linux-libc-dev | CVE-2021-47658 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/pm: fix a potential gpu_metrics_table memory leak |
| linux-libc-dev | CVE-2022-0400 | MEDIUM | 5.15.0-161.171 |  | kernel: Out of bounds read in the smc protocol stack |
| linux-libc-dev | CVE-2022-0480 | MEDIUM | 5.15.0-161.171 |  | kernel: memcg does not limit the number of POSIX file locks allowing memory exhaustion |
| linux-libc-dev | CVE-2022-1205 | MEDIUM | 5.15.0-161.171 |  | kernel: Null pointer dereference and use after free in net/ax25/ax25_timer.c |
| linux-libc-dev | CVE-2022-1247 | MEDIUM | 5.15.0-161.171 |  | kernel: A race condition bug in rose_connect() |
| linux-libc-dev | CVE-2022-25836 | MEDIUM | 5.15.0-161.171 |  |  |
| linux-libc-dev | CVE-2022-2961 | MEDIUM | 5.15.0-161.171 |  | kernel: race condition in rose_bind() |
| linux-libc-dev | CVE-2022-3238 | MEDIUM | 5.15.0-161.171 |  | kernel: ntfs3 local privledge escalation if NTFS character set and remount and umount called simultaneously |
| linux-libc-dev | CVE-2022-3523 | MEDIUM | 5.15.0-161.171 |  | Kernel: race when faulting a device private page in memory manager |
| linux-libc-dev | CVE-2022-38457 | MEDIUM | 5.15.0-161.171 |  | kernel: vmwgfx: use-after-free in vmw_cmd_res_check |
| linux-libc-dev | CVE-2022-40133 | MEDIUM | 5.15.0-161.171 |  | kernel: vmwgfx: use-after-free in vmw_execbuf_tie_context |
| linux-libc-dev | CVE-2022-4543 | MEDIUM | 5.15.0-161.171 |  | kernel: KASLR Prefetch Bypass Breaks KPTI |
| linux-libc-dev | CVE-2022-48628 | MEDIUM | 5.15.0-161.171 |  | kernel: ceph: drop messages from MDS when unmounting |
| linux-libc-dev | CVE-2022-48633 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/gma500: Fix WARN_ON(lock-->magic != lock) error |
| linux-libc-dev | CVE-2022-48646 | MEDIUM | 5.15.0-161.171 |  | kernel: sfc/siena: fix null pointer dereference in efx_hard_start_xmit |
| linux-libc-dev | CVE-2022-48667 | MEDIUM | 5.15.0-161.171 |  | kernel: smb3: fix temporary data corruption in insert range |
| linux-libc-dev | CVE-2022-48668 | MEDIUM | 5.15.0-161.171 |  | kernel: smb3: fix temporary data corruption in collapse range |
| linux-libc-dev | CVE-2022-48673 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: Fix possible access to freed memory in link clear |
| linux-libc-dev | CVE-2022-48706 | MEDIUM | 5.15.0-161.171 |  | kernel: vdpa: ifcvf: Do proper cleanup if IFCVF init fails |
| linux-libc-dev | CVE-2022-48744 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Avoid field-overflowing memcpy() |
| linux-libc-dev | CVE-2022-48766 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Wrap dcn301_calculate_wm_and_dlg for FPU. |
| linux-libc-dev | CVE-2022-48771 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vmwgfx: Fix stale file descriptors on failed usercopy |
| linux-libc-dev | CVE-2022-48816 | MEDIUM | 5.15.0-161.171 |  | kernel: SUNRPC: lock against -&gt;sock changing during sysfs read |
| linux-libc-dev | CVE-2022-48887 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vmwgfx: Remove rcu locks from user resources |
| linux-libc-dev | CVE-2022-48929 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix crash due to out of bounds access into reg2btf_ids. |
| linux-libc-dev | CVE-2022-48976 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: flowtable_offload: fix using __this_cpu_add in preemptible |
| linux-libc-dev | CVE-2022-48979 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: fix array index out of bound error in DCN32 DML |
| linux-libc-dev | CVE-2022-48990 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: fix use-after-free during gpu recovery |
| linux-libc-dev | CVE-2022-48998 | MEDIUM | 5.15.0-161.171 |  | kernel: powerpc/bpf/32: Fix Oops on tail call tests |
| linux-libc-dev | CVE-2022-49069 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix by adding FPU protection for dcn30_internal_validate_bw |
| linux-libc-dev | CVE-2022-49108 | MEDIUM | 5.15.0-161.171 |  | kernel: clk: mediatek: Fix memory leaks on probe |
| linux-libc-dev | CVE-2022-49123 | MEDIUM | 5.15.0-161.171 |  | kernel: ath11k: Fix frames flush failure caused by deadlock |
| linux-libc-dev | CVE-2022-49124 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/mce: Work around an erratum on fast string copy instructions |
| linux-libc-dev | CVE-2022-49125 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/sprd: fix potential NULL dereference |
| linux-libc-dev | CVE-2022-49127 | MEDIUM | 5.15.0-161.171 |  | kernel: ref_tracker: implement use-after-free detection |
| linux-libc-dev | CVE-2022-49133 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: svm range restore work deadlock when process exit |
| linux-libc-dev | CVE-2022-49134 | MEDIUM | 5.15.0-161.171 |  | kernel: mlxsw: spectrum: Guard against invalid local ports |
| linux-libc-dev | CVE-2022-49136 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: hci_sync: Fix queuing commands when HCI_UNREGISTER is set |
| linux-libc-dev | CVE-2022-49138 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: hci_event: Ignore multiple conn complete events |
| linux-libc-dev | CVE-2022-49161 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: mediatek: Fix error handling in mt8183_da7219_max98357_dev_probe |
| linux-libc-dev | CVE-2022-49167 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: do not double complete bio on errors during compressed reads |
| linux-libc-dev | CVE-2022-49172 | MEDIUM | 5.15.0-161.171 |  | kernel: parisc: Fix non-access data TLB cache flush faults |
| linux-libc-dev | CVE-2022-49173 | MEDIUM | 5.15.0-161.171 |  | kernel: spi: fsi: Implement a timeout for polling status |
| linux-libc-dev | CVE-2022-49177 | MEDIUM | 5.15.0-161.171 |  | kernel: hwrng: cavium - fix NULL but dereferenced coccicheck error |
| linux-libc-dev | CVE-2022-49178 | MEDIUM | 5.15.0-161.171 |  | kernel: memstick/mspro_block: fix handling of read-only devices |
| linux-libc-dev | CVE-2022-49203 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix double free during GPU reset on DC streams |
| linux-libc-dev | CVE-2022-49218 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/dp: Fix OOB read when handling Post Cursor2 register |
| linux-libc-dev | CVE-2022-49234 | MEDIUM | 5.15.0-161.171 |  | kernel: net: dsa: Avoid cross-chip syncing of VLAN filtering |
| linux-libc-dev | CVE-2022-49245 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: rockchip: Fix PM usage reference of rockchip_i2s_tdm_resume |
| linux-libc-dev | CVE-2022-49267 | MEDIUM | 5.15.0-161.171 |  | kernel: mmc: core: use sysfs_emit() instead of sprintf() |
| linux-libc-dev | CVE-2022-49296 | MEDIUM | 5.15.0-161.171 |  | kernel: ceph: fix possible deadlock when holding Fwb to get inline_data |
| linux-libc-dev | CVE-2022-49303 | MEDIUM | 5.15.0-161.171 |  | kernel: drivers: staging: rtl8192eu: Fix deadlock in rtw_joinbss_event_prehandle |
| linux-libc-dev | CVE-2022-49306 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: dwc3: host: Stop setting the ACPI companion |
| linux-libc-dev | CVE-2022-49317 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: avoid infinite loop to flush node pages |
| linux-libc-dev | CVE-2022-49333 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: E-Switch, pair only capable devices |
| linux-libc-dev | CVE-2022-49342 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ethernet: bgmac: Fix refcount leak in bcma_mdio_mii_register |
| linux-libc-dev | CVE-2022-49359 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/panfrost: Job should reference MMU not file_priv |
| linux-libc-dev | CVE-2022-49393 | MEDIUM | 5.15.0-161.171 |  | kernel: misc: fastrpc: fix list iterator in fastrpc_req_mem_unmap_impl |
| linux-libc-dev | CVE-2022-49401 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/page_owner: use strscpy() instead of strlcpy() |
| linux-libc-dev | CVE-2022-49420 | MEDIUM | 5.15.0-161.171 |  | kernel: net: annotate races around sk->sk_bound_dev_if |
| linux-libc-dev | CVE-2022-49465 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-throttle: Set BIO_THROTTLED when bio has been throttled |
| linux-libc-dev | CVE-2022-49469 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix anon_dev leak in create_subvol() |
| linux-libc-dev | CVE-2022-49471 | MEDIUM | 5.15.0-161.171 |  | kernel: rtw89: cfo: check mac_id to avoid out-of-bounds |
| linux-libc-dev | CVE-2022-49476 | MEDIUM | 5.15.0-161.171 |  | kernel: mt76: mt7921: fix kernel crash at mt7921_pci_remove |
| linux-libc-dev | CVE-2022-49484 | MEDIUM | 5.15.0-161.171 |  | kernel: mt76: mt7915: fix possible NULL pointer dereference in mt7915_mac_fill_rx_vector |
| linux-libc-dev | CVE-2022-49496 | MEDIUM | 5.15.0-161.171 |  | kernel: media: mediatek: vcodec: prevent kernel crash when rmmod mtk-vcodec-dec.ko |
| linux-libc-dev | CVE-2022-49504 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: lpfc: Inhibit aborts if external loopback plug is inserted |
| linux-libc-dev | CVE-2022-49516 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: always check VF VSI pointer values |
| linux-libc-dev | CVE-2022-49518 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: SOF: ipc3-topology: Correct get_control_data for non bytes payload |
| linux-libc-dev | CVE-2022-49528 | MEDIUM | 5.15.0-161.171 |  | kernel: media: i2c: dw9714: Disable the regulator when the driver fails to probe |
| linux-libc-dev | CVE-2022-49529 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu/pm: fix the null pointer while the smu is disabled |
| linux-libc-dev | CVE-2022-49531 | MEDIUM | 5.15.0-161.171 |  | kernel: loop: implement ->free_disk |
| linux-libc-dev | CVE-2022-49533 | MEDIUM | 5.15.0-161.171 |  | kernel: ath11k: Change max no of active probe SSID and BSSID to fw capability |
| linux-libc-dev | CVE-2022-49534 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: lpfc: Protect memory leak for NPIV ports sending PLOGI_RJT |
| linux-libc-dev | CVE-2022-49539 | MEDIUM | 5.15.0-161.171 |  | kernel: rtw89: ser: fix CAM leaks occurring in L2 reset |
| linux-libc-dev | CVE-2022-49543 | MEDIUM | 5.15.0-161.171 |  | kernel: ath11k: fix the warning of dev_wake in mhi_pm_disable_transition() |
| linux-libc-dev | CVE-2022-49547 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix deadlock between concurrent dio writes when low on free data space |
| linux-libc-dev | CVE-2022-49552 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix combination of jit blinding and pointers to bpf subprogs. |
| linux-libc-dev | CVE-2022-49562 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: x86: Use __try_cmpxchg_user() to update guest PTE A/D bits |
| linux-libc-dev | CVE-2022-49622 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: nf_tables: avoid skb access on nf_stolen |
| linux-libc-dev | CVE-2022-49635 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/i915/selftests: fix subtraction overflow bug |
| linux-libc-dev | CVE-2022-49651 | MEDIUM | 5.15.0-161.171 |  | kernel: srcu: Tighten cleanup_srcu_struct() GP checks |
| linux-libc-dev | CVE-2022-49699 | MEDIUM | 5.15.0-161.171 |  | kernel: filemap: Handle sibling entries in filemap_get_read_batch() |
| linux-libc-dev | CVE-2022-49722 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: Fix memory corruption in VF driver |
| linux-libc-dev | CVE-2022-49742 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: initialize locks earlier in f2fs_fill_super() |
| linux-libc-dev | CVE-2022-49750 | MEDIUM | 5.15.0-161.171 |  | kernel: cpufreq: CPPC: Add u64 casts to avoid overflowing |
| linux-libc-dev | CVE-2022-49759 | MEDIUM | 5.15.0-161.171 |  | kernel: VMCI: Use threaded irqs instead of tasklets |
| linux-libc-dev | CVE-2022-49764 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Prevent bpf program recursion for raw tracepoint probes |
| linux-libc-dev | CVE-2022-49766 | MEDIUM | 5.15.0-161.171 |  | kernel: netlink: Bounds-check struct nlmsgerr creation |
| linux-libc-dev | CVE-2022-49773 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix optc2_configure warning on dcn314 |
| linux-libc-dev | CVE-2022-49783 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/fpu: Drop fpregs lock before inheriting FPU permissions |
| linux-libc-dev | CVE-2022-49803 | MEDIUM | 5.15.0-161.171 |  | kernel: netdevsim: Fix memory leak of nsim_dev->fa_cookie |
| linux-libc-dev | CVE-2022-49810 | MEDIUM | 5.15.0-161.171 |  | kernel: netfs: Fix missing xas_retry() calls in xarray iteration |
| linux-libc-dev | CVE-2022-49829 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/scheduler: fix fence ref counting |
| linux-libc-dev | CVE-2022-49833 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: zoned: clone zoned device info when cloning a device |
| linux-libc-dev | CVE-2022-49858 | MEDIUM | 5.15.0-161.171 |  | kernel: octeontx2-pf: Fix SQE threshold checking |
| linux-libc-dev | CVE-2022-49901 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-mq: Fix kmemleak in blk_mq_init_allocated_queue |
| linux-libc-dev | CVE-2022-49910 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: L2CAP: Fix use-after-free caused by l2cap_reassemble_sdu |
| linux-libc-dev | CVE-2022-49932 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: VMX: Do _all_ initialization before exposing /dev/kvm to userspace |
| linux-libc-dev | CVE-2022-49935 | MEDIUM | 5.15.0-161.171 |  | kernel: dma-buf/dma-resv: check if the new fence is really later |
| linux-libc-dev | CVE-2022-49940 | MEDIUM | 5.15.0-161.171 |  | kernel: tty: n_gsm: add sanity check for gsm->receive in gsm_receive_buf() |
| linux-libc-dev | CVE-2022-49943 | MEDIUM | 5.15.0-161.171 |  | kernel: USB: gadget: Fix obscure lockdep violation for udc_mutex |
| linux-libc-dev | CVE-2022-49955 | MEDIUM | 5.15.0-161.171 |  | kernel: powerpc/rtas: Fix RTAS MSR[HV] handling for Cell |
| linux-libc-dev | CVE-2022-49961 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Do mark_chain_precision for ARG_CONST_ALLOC_SIZE_OR_ZERO |
| linux-libc-dev | CVE-2022-49965 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/pm: add missing ->fini_xxxx interfaces for some SMU13 asics |
| linux-libc-dev | CVE-2022-49967 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix a data-race around bpf_jit_limit. |
| linux-libc-dev | CVE-2022-49971 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/pm: Fix a potential gpu_metrics_table memory leak |
| linux-libc-dev | CVE-2022-49974 | MEDIUM | 5.15.0-161.171 |  | kernel: HID: nintendo: fix rumble worker null pointer deref |
| linux-libc-dev | CVE-2022-49980 | MEDIUM | 5.15.0-161.171 |  | kernel: USB: gadget: Fix use-after-free Read in usb_udc_uevent() |
| linux-libc-dev | CVE-2022-49997 | MEDIUM | 5.15.0-161.171 |  | kernel: net: lantiq_xrx200: restore buffer if memory allocation failed |
| linux-libc-dev | CVE-2022-50002 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: LAG, fix logic over MLX5_LAG_FLAG_NDEVS_READY |
| linux-libc-dev | CVE-2022-50009 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix null-ptr-deref in f2fs_get_dnode_of_data |
| linux-libc-dev | CVE-2022-50015 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: SOF: Intel: hda-ipc: Do not process IPC reply before firmware boot |
| linux-libc-dev | CVE-2022-50016 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: SOF: Intel: cnl: Do not process IPC reply before firmware boot |
| linux-libc-dev | CVE-2022-50071 | MEDIUM | 5.15.0-161.171 |  | kernel: mptcp: move subflow cleanup in mptcp_destroy_common() |
| linux-libc-dev | CVE-2022-50073 | MEDIUM | 5.15.0-161.171 |  | kernel: net: tap: NULL pointer derefence in dev_parse_header_protocol when skb->dev is null |
| linux-libc-dev | CVE-2022-50090 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: replace BTRFS_MAX_EXTENT_SIZE with fs_info->max_extent_size |
| linux-libc-dev | CVE-2022-50095 | MEDIUM | 5.15.0-161.171 |  | kernel: posix-cpu-timers: Cleanup CPU timers before freeing them during exec |
| linux-libc-dev | CVE-2022-50116 | MEDIUM | 5.15.0-161.171 |  | kernel: tty: n_gsm: fix deadlock and link starvation in outgoing data path |
| linux-libc-dev | CVE-2022-50163 | MEDIUM | 5.15.0-161.171 |  | kernel: ax25: fix incorrect dev_tracker usage |
| linux-libc-dev | CVE-2022-50166 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: When HCI work queue is drained, only queue chained work |
| linux-libc-dev | CVE-2022-50167 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: fix potential 32-bit overflow when accessing ARRAY map element |
| linux-libc-dev | CVE-2022-50178 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: 8852a: rfk: fix div 0 exception |
| linux-libc-dev | CVE-2022-50195 | MEDIUM | 5.15.0-161.171 |  | kernel: ARM: dts: qcom: replace gcc PXO with pxo_board fixed clock |
| linux-libc-dev | CVE-2022-50212 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: nf_tables: do not allow CHAIN_ID to refer to another table |
| linux-libc-dev | CVE-2022-50213 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: nf_tables: do not allow SET_ID to refer to another table |
| linux-libc-dev | CVE-2022-50224 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: x86/mmu: Treat NX as a valid SPTE bit for NPT |
| linux-libc-dev | CVE-2022-50230 | MEDIUM | 5.15.0-161.171 |  | kernel: arm64: set UXN on swapper page tables |
| linux-libc-dev | CVE-2022-50232 | MEDIUM | 5.15.0-161.171 |  | kernel: arm64: set UXN on swapper page tables |
| linux-libc-dev | CVE-2022-50234 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring/af_unix: defer registered files gc to io_uring release |
| linux-libc-dev | CVE-2022-50236 | MEDIUM | 5.15.0-161.171 |  | kernel: iommu/mediatek: Fix crash on isr after kexec() |
| linux-libc-dev | CVE-2022-50240 | MEDIUM | 5.15.0-161.171 |  | kernel: binder: fix UAF of alloc->vma in race with munmap() |
| linux-libc-dev | CVE-2022-50256 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/meson: remove drm bridges at aggregate driver unbind time |
| linux-libc-dev | CVE-2022-50260 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm: Make .remove and .shutdown HW shutdown consistent |
| linux-libc-dev | CVE-2022-50266 | MEDIUM | 5.15.0-161.171 |  | kernel: kprobes: Fix check for probe enabled in kill_kprobe() |
| linux-libc-dev | CVE-2022-50284 | MEDIUM | 5.15.0-161.171 |  | kernel: ipc: fix memory leak in init_mqueue_fs() |
| linux-libc-dev | CVE-2022-50303 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Fix double release compute pasid |
| linux-libc-dev | CVE-2022-50304 | MEDIUM | 5.15.0-161.171 |  | kernel: mtd: core: fix possible resource leak in init_mtd() |
| linux-libc-dev | CVE-2022-50316 | MEDIUM | 5.15.0-161.171 |  | kernel: orangefs: Fix kmemleak in orangefs_sysfs_init() |
| linux-libc-dev | CVE-2022-50322 | MEDIUM | 5.15.0-161.171 |  | kernel: rtc: msc313: Fix function prototype mismatch in msc313_rtc_probe() |
| linux-libc-dev | CVE-2022-50332 | MEDIUM | 5.15.0-161.171 |  | kernel: video/aperture: Call sysfb_disable() before removing PCI devices |
| linux-libc-dev | CVE-2022-50350 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: target: iscsi: Fix a race condition between login_work and the login thread |
| linux-libc-dev | CVE-2022-50354 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Fix kfd_process_device_init_vm error handling |
| linux-libc-dev | CVE-2022-50357 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: dwc3: core: fix some leaks in probe |
| linux-libc-dev | CVE-2022-50380 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: /proc/pid/smaps_rollup: fix no vma's null-deref |
| linux-libc-dev | CVE-2022-50383 | MEDIUM | 5.15.0-161.171 |  | kernel: media: mediatek: vcodec: Can't set dst buffer to done when lat decode error |
| linux-libc-dev | CVE-2022-50390 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/ttm: fix undefined behavior in bit shift for TTM_TT_FLAG_PRIV_POPULATED |
| linux-libc-dev | CVE-2022-50393 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: SDMA update use unlocked iterator |
| linux-libc-dev | CVE-2022-50406 | MEDIUM | 5.15.0-161.171 |  | kernel: iomap: iomap: fix memory corruption when recording errors during writeback |
| linux-libc-dev | CVE-2022-50407 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: hisilicon/qm - increase the memory of local variables |
| linux-libc-dev | CVE-2022-50418 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath11k: mhi: fix potential memory leak in ath11k_mhi_register() |
| linux-libc-dev | CVE-2022-50425 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/fpu: Fix copy_xstate_to_uabi() to copy init states correctly |
| linux-libc-dev | CVE-2022-50461 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ethernet: ti: am65-cpsw: Fix PM runtime leakage in am65_cpsw_nuss_ndo_slave_open() |
| linux-libc-dev | CVE-2022-50464 | MEDIUM | 5.15.0-161.171 |  | kernel: mt76: mt7915: Fix PCI device refcount leak in mt7915_pci_init_hif2() |
| linux-libc-dev | CVE-2022-50467 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: lpfc: Fix null ndlp ptr dereference in abnormal exit path for GFT_ID |
| linux-libc-dev | CVE-2022-50479 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd: fix potential memory leak |
| linux-libc-dev | CVE-2022-50492 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm: fix use-after-free on probe deferral |
| linux-libc-dev | CVE-2022-50500 | MEDIUM | 5.15.0-161.171 |  | kernel: netdevsim: fix memory leak in nsim_drv_probe() when nsim_dev_resources_register() failed |
| linux-libc-dev | CVE-2022-50518 | MEDIUM | 5.15.0-161.171 |  | kernel: parisc: Fix locking in pdc_iodc_print() firmware call |
| linux-libc-dev | CVE-2022-50527 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Fix size validation for non-exclusive domains (v4) |
| linux-libc-dev | CVE-2022-50539 | MEDIUM | 5.15.0-161.171 |  | kernel: ARM: OMAP2+: omap4-common: Fix refcount leak bug |
| linux-libc-dev | CVE-2022-50550 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-iolatency: Fix memory leak on add_disk() failures |
| linux-libc-dev | CVE-2022-50551 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: brcmfmac: Fix potential shift-out-of-bounds in brcmf_fw_alloc_request() |
| linux-libc-dev | CVE-2022-50552 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-mq: use quiesced elevator switch when reinitializing queues |
| linux-libc-dev | CVE-2022-50554 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-mq: avoid double ->queue_rq() because of early timeout |
| linux-libc-dev | CVE-2022-50571 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: call __btrfs_remove_free_space_cache_locked on cache load failure |
| linux-libc-dev | CVE-2023-0030 | MEDIUM | 5.15.0-161.171 |  | kernel: Use after Free in nvkm_vmm_pfn_map |
| linux-libc-dev | CVE-2023-0160 | MEDIUM | 5.15.0-161.171 |  | kernel: possibility of deadlock in libbpf function sock_hash_delete_elem |
| linux-libc-dev | CVE-2023-1193 | MEDIUM | 5.15.0-161.171 |  | kernel: use-after-free in setup_async_work() |
| linux-libc-dev | CVE-2023-2007 | MEDIUM | 5.15.0-161.171 |  | kernel: DPT I2O controller TOCTOU information disclosure vulnerability |
| linux-libc-dev | CVE-2023-26242 | MEDIUM | 5.15.0-161.171 |  | afu_mmio_region_get_by_offset in drivers/fpga/dfl-afu-region.c in the  ... |
| linux-libc-dev | CVE-2023-31082 | MEDIUM | 5.15.0-161.171 |  | kernel: sleeping function called from an invalid context in gsmld_write |
| linux-libc-dev | CVE-2023-45896 | MEDIUM | 5.15.0-161.171 |  | kernel: ntfs3: kernel memory read by mounting a filesystem |
| linux-libc-dev | CVE-2023-52452 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix accesses to uninit stack slots |
| linux-libc-dev | CVE-2023-52481 | MEDIUM | 5.15.0-161.171 |  | kernel: arm64: errata: Add Cortex-A520 speculative unprivileged load workaround |
| linux-libc-dev | CVE-2023-52485 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Wake DMCUB before sending a command cause deadlock |
| linux-libc-dev | CVE-2023-52508 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme-fc: Prevent null pointer dereference in nvme_fc_io_getuuid() |
| linux-libc-dev | CVE-2023-52561 | MEDIUM | 5.15.0-161.171 |  | kernel: arm64: dts: qcom: sdm845-db845c: unreserved cont splash memory region leads to kernel panic |
| linux-libc-dev | CVE-2023-52569 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: improper BUG() call after failure to insert delayed dir index item |
| linux-libc-dev | CVE-2023-52576 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/mm, kexec, ima: potential use-after-free in memblock_isolate_range() |
| linux-libc-dev | CVE-2023-52582 | MEDIUM | 5.15.0-161.171 |  | kernel: netfs: improper loop in netfs_rreq_unlock_folios() |
| linux-libc-dev | CVE-2023-52586 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm/dpu: Add mutex lock in control vblank irq |
| linux-libc-dev | CVE-2023-52589 | MEDIUM | 5.15.0-161.171 |  | kernel: media: rkisp1: Fix IRQ disable race issue |
| linux-libc-dev | CVE-2023-52590 | MEDIUM | 5.15.0-161.171 |  | kernel: ocfs2: Avoid touching renamed directory if parent does not change |
| linux-libc-dev | CVE-2023-52591 | MEDIUM | 5.15.0-161.171 |  | kernel: reiserfs: Avoid touching renamed directory if parent does not change |
| linux-libc-dev | CVE-2023-52624 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Wake DMCUB before executing GPINT commands |
| linux-libc-dev | CVE-2023-52625 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Refactor DMCUB enter/exit idle interface |
| linux-libc-dev | CVE-2023-52632 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: lock dependency warning with srcu |
| linux-libc-dev | CVE-2023-52634 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix disable_otg_wa logic |
| linux-libc-dev | CVE-2023-52648 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vmwgfx: Unmap the surface before resetting it on a plane state |
| linux-libc-dev | CVE-2023-52653 | MEDIUM | 5.15.0-161.171 |  | kernel: SUNRPC: fix a memleak in gss_import_v2_context |
| linux-libc-dev | CVE-2023-52657 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert &#34;drm/amd/pm: resolve reboot exception for si oland&#34; |
| linux-libc-dev | CVE-2023-52660 | MEDIUM | 5.15.0-161.171 |  | kernel: media: rkisp1: Fix IRQ handling due to shared interrupts |
| linux-libc-dev | CVE-2023-52671 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix hang/underflow when transitioning to ODM4:1 |
| linux-libc-dev | CVE-2023-52673 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix a debugfs null pointer error |
| linux-libc-dev | CVE-2023-52676 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Guard stack limits against 32bit overflow |
| linux-libc-dev | CVE-2023-52682 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to wait on block writeback for post_read case |
| linux-libc-dev | CVE-2023-52700 | MEDIUM | 5.15.0-161.171 |  | kernel: tipc: fix kernel warning when sending SYN message |
| linux-libc-dev | CVE-2023-52701 | MEDIUM | 5.15.0-161.171 |  | kernel: net: use a bounce buffer for copying skb-&gt;mark |
| linux-libc-dev | CVE-2023-52732 | MEDIUM | 5.15.0-161.171 |  | kernel: ceph: blocklist the kclient when receiving corrupted snap trace |
| linux-libc-dev | CVE-2023-52737 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: lock the inode in shared mode before starting fiemap |
| linux-libc-dev | CVE-2023-52751 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix use-after-free in smb2_query_info_compound() |
| linux-libc-dev | CVE-2023-52761 | MEDIUM | 5.15.0-161.171 |  | kernel: riscv: VMAP_STACK overflow detection thread-safe |
| linux-libc-dev | CVE-2023-52829 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: fix possible out-of-bound write in ath12k_wmi_ext_hal_reg_caps() |
| linux-libc-dev | CVE-2023-52831 | MEDIUM | 5.15.0-161.171 |  | kernel: cpu/hotplug: Don't offline the last non-isolated CPU |
| linux-libc-dev | CVE-2023-52837 | MEDIUM | 5.15.0-161.171 |  | kernel: nbd: fix uaf in nbd_open |
| linux-libc-dev | CVE-2023-52857 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/mediatek: Fix coverity issue with unintentional integer overflow |
| linux-libc-dev | CVE-2023-52879 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing: Have trace_event_file have ref counters |
| linux-libc-dev | CVE-2023-52888 | MEDIUM | 5.15.0-161.171 |  | kernel: media: mediatek: vcodec: Only free buffer VA that is not NULL |
| linux-libc-dev | CVE-2023-52905 | MEDIUM | 5.15.0-161.171 |  | kernel: octeontx2-pf: Fix resource leakage in VF driver unbind |
| linux-libc-dev | CVE-2023-52916 | MEDIUM | 5.15.0-161.171 |  | kernel: media: aspeed: Fix memory overwrite if timing is 1600x900 |
| linux-libc-dev | CVE-2023-52920 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: support non-r10 register spill/fill to/from stack in precision tracking |
| linux-libc-dev | CVE-2023-52921 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: fix possible UAF in amdgpu_cs_pass1() |
| linux-libc-dev | CVE-2023-52926 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring/rw: split io_read() into a helper |
| linux-libc-dev | CVE-2023-52939 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: memcg: fix NULL pointer in mem_cgroup_track_foreign_dirty_slowpath() |
| linux-libc-dev | CVE-2023-52981 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/i915: Fix request ref counting during error capture & debugfs dump |
| linux-libc-dev | CVE-2023-53002 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/i915: Fix a memory leak with reused mmap_offset |
| linux-libc-dev | CVE-2023-53008 | MEDIUM | 5.15.0-161.171 |  | kernel: cifs: fix potential memory leaks in session setup |
| linux-libc-dev | CVE-2023-53009 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Add sync after creating vram bo |
| linux-libc-dev | CVE-2023-53010 | MEDIUM | 5.15.0-161.171 |  | kernel: bnxt: Do not read past the end of test names |
| linux-libc-dev | CVE-2023-53036 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Fix call trace warning and hang when removing amdgpu device |
| linux-libc-dev | CVE-2023-53037 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Bad drive in topology results kernel crash |
| linux-libc-dev | CVE-2023-53042 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Do not set DRR on pipe Commit |
| linux-libc-dev | CVE-2023-53068 | MEDIUM | 5.15.0-161.171 |  | kernel: net: usb: lan78xx: Limit packet length to skb->len |
| linux-libc-dev | CVE-2023-53072 | MEDIUM | 5.15.0-161.171 |  | kernel: mptcp: use the workqueue to destroy unaccepted sockets |
| linux-libc-dev | CVE-2023-53093 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing: Do not let histogram values have some modifiers |
| linux-libc-dev | CVE-2023-53105 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Fix cleanup null-ptr deref on encap lock |
| linux-libc-dev | CVE-2023-53115 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Fix memory leaks in mpi3mr_init_ioc() |
| linux-libc-dev | CVE-2023-53149 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: avoid deadlock in fs reclaim with page writeback |
| linux-libc-dev | CVE-2023-53152 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: fix calltrace warning in amddrm_buddy_fini |
| linux-libc-dev | CVE-2023-53168 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: ucsi_acpi: Increase the command completion timeout |
| linux-libc-dev | CVE-2023-53178 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: fix zswap writeback race condition |
| linux-libc-dev | CVE-2023-53180 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Avoid NULL pointer access during management transmit cleanup |
| linux-libc-dev | CVE-2023-53187 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix use-after-free of new block group that became unused |
| linux-libc-dev | CVE-2023-53198 | MEDIUM | 5.15.0-161.171 |  | kernel: raw: Fix NULL deref in raw_get_next() |
| linux-libc-dev | CVE-2023-53209 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211_hwsim: Fix possible NULL dereference |
| linux-libc-dev | CVE-2023-53218 | MEDIUM | 5.15.0-161.171 |  | kernel: rxrpc: Make it so that a waiting process can be aborted |
| linux-libc-dev | CVE-2023-53221 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix memleak due to fentry attach failure |
| linux-libc-dev | CVE-2023-53231 | MEDIUM | 5.15.0-161.171 |  | kernel: erofs: Fix detection of atomic context |
| linux-libc-dev | CVE-2023-53240 | MEDIUM | 5.15.0-161.171 |  | kernel: xsk: check IFF_UP earlier in Tx path |
| linux-libc-dev | CVE-2023-53247 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: set_page_extent_mapped after read_folio in btrfs_cont_expand |
| linux-libc-dev | CVE-2023-53248 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: install stub fence into potential unused fence pointers |
| linux-libc-dev | CVE-2023-53254 | MEDIUM | 5.15.0-161.171 |  | kernel: cacheinfo: Fix shared_cpu_map to handle shared caches at different levels |
| linux-libc-dev | CVE-2023-53258 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix possible underflow for displays with large vblank |
| linux-libc-dev | CVE-2023-53261 | MEDIUM | 5.15.0-161.171 |  | kernel: coresight: Fix memory leak in acpi_buffer->pointer |
| linux-libc-dev | CVE-2023-53292 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-mq: fix NULL dereference on q->elevator in blk_mq_elv_switch_none |
| linux-libc-dev | CVE-2023-53320 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Fix issues in mpi3mr_get_all_tgt_info() |
| linux-libc-dev | CVE-2023-53323 | MEDIUM | 5.15.0-161.171 |  | kernel: ext2/dax: Fix ext2_setsize when len is page aligned |
| linux-libc-dev | CVE-2023-53325 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/mediatek: dp: Change logging to dev for mtk_dp_aux_transfer() |
| linux-libc-dev | CVE-2023-53332 | MEDIUM | 5.15.0-161.171 |  | kernel: genirq/ipi: Fix NULL pointer deref in irq_data_get_affinity_mask() |
| linux-libc-dev | CVE-2023-53347 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: Handle pairing of E-switch via uplink un/load APIs |
| linux-libc-dev | CVE-2023-53348 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix deadlock when aborting transaction during relocation with scrub |
| linux-libc-dev | CVE-2023-53353 | MEDIUM | 5.15.0-161.171 |  | kernel: accel/habanalabs: postpone mem_mgr IDR destruction to hpriv_release() |
| linux-libc-dev | CVE-2023-53355 | MEDIUM | 5.15.0-161.171 |  | kernel: staging: pi433: fix memory leak with using debugfs_lookup() |
| linux-libc-dev | CVE-2023-53362 | MEDIUM | 5.15.0-161.171 |  | kernel: bus: fsl-mc: don't assume child devices are all fsl-mc devices |
| linux-libc-dev | CVE-2023-53366 | MEDIUM | 5.15.0-161.171 |  | kernel: block: be a bit more careful in checking for NULL bdev while polling |
| linux-libc-dev | CVE-2023-53367 | MEDIUM | 5.15.0-161.171 |  | kernel: accel/habanalabs: fix mem leak in capture user mappings |
| linux-libc-dev | CVE-2023-53370 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: fix memory leak in mes self test |
| linux-libc-dev | CVE-2023-53371 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: fix memory leak in mlx5e_fs_tt_redirect_any_create |
| linux-libc-dev | CVE-2023-53376 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Use number of bits to manage bitmap sizes |
| linux-libc-dev | CVE-2023-53382 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: Reset connection when trying to use SMCRv2 fails |
| linux-libc-dev | CVE-2023-53383 | MEDIUM | 5.15.0-161.171 |  | kernel: irqchip/gicv3: Workaround for NVIDIA erratum T241-FABRIC-4 |
| linux-libc-dev | CVE-2023-53385 | MEDIUM | 5.15.0-161.171 |  | kernel: media: mdp3: Fix resource leaks in of_find_device_by_node |
| linux-libc-dev | CVE-2023-53387 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: core: Fix device management cmd timeout flow |
| linux-libc-dev | CVE-2023-53401 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: kmem: fix a NULL pointer dereference in obj_stock_flush_required() |
| linux-libc-dev | CVE-2023-53410 | MEDIUM | 5.15.0-161.171 |  | kernel: USB: ULPI: fix memory leak with using debugfs_lookup() |
| linux-libc-dev | CVE-2023-53421 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-cgroup: Reinit blkg_iostat_set after clearing in blkcg_reset_stats() |
| linux-libc-dev | CVE-2023-53424 | MEDIUM | 5.15.0-161.171 |  | kernel: clk: mediatek: fix of_iomap memory leak |
| linux-libc-dev | CVE-2023-53429 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: don't check PageError in __extent_writepage |
| linux-libc-dev | CVE-2023-53434 | MEDIUM | 5.15.0-161.171 |  | kernel: remoteproc: imx_dsp_rproc: Add custom memory copy implementation for i.MX DSP Cores |
| linux-libc-dev | CVE-2023-53438 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/MCE: Always save CS register on AMD Zen IF Poison errors |
| linux-libc-dev | CVE-2023-53447 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: don't reset unchangable mount option in f2fs_remount() |
| linux-libc-dev | CVE-2023-53452 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: fix potential race condition between napi_init and napi_enable |
| linux-libc-dev | CVE-2023-53460 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw88: fix memory leak in rtw_usb_probe() |
| linux-libc-dev | CVE-2023-53466 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mt76: mt7915: fix memory leak in mt7915_mcu_exit |
| linux-libc-dev | CVE-2023-53469 | MEDIUM | 5.15.0-161.171 |  | kernel: af_unix: Fix null-ptr-deref in unix_stream_sendpage() |
| linux-libc-dev | CVE-2023-53478 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing/synthetic: Fix races on freeing last_cmd |
| linux-libc-dev | CVE-2023-53483 | MEDIUM | 5.15.0-161.171 |  | kernel: ACPI: processor: Check for null return of devm_kzalloc() in fch_misc_setup() |
| linux-libc-dev | CVE-2023-53491 | MEDIUM | 5.15.0-161.171 |  | kernel: start_kernel: Add __no_stack_protector function attribute |
| linux-libc-dev | CVE-2023-53509 | MEDIUM | 5.15.0-161.171 |  | kernel: qed: allow sleep in qed_mcp_trace_dump() |
| linux-libc-dev | CVE-2023-53510 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: core: Fix handling of lrbp->cmd |
| linux-libc-dev | CVE-2023-53520 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: Fix hci_suspend_sync crash |
| linux-libc-dev | CVE-2023-53529 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw88: Fix memory leak in rtw88_usb |
| linux-libc-dev | CVE-2023-53538 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: insert tree mod log move in push_node_left |
| linux-libc-dev | CVE-2023-53539 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/rxe: Fix incomplete state save in rxe_requester |
| linux-libc-dev | CVE-2023-53540 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: cfg80211: reject auth/assoc to AP with our address |
| linux-libc-dev | CVE-2023-53544 | MEDIUM | 5.15.0-161.171 |  | kernel: cpufreq: davinci: Fix clk use after free |
| linux-libc-dev | CVE-2023-53545 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: unmap and remove csa_va properly |
| linux-libc-dev | CVE-2023-53547 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Fix sdma v4 sw fini error |
| linux-libc-dev | CVE-2023-53558 | MEDIUM | 5.15.0-161.171 |  | kernel: rcu-tasks: Avoid pr_info() with spin lock in cblist_init_generic() |
| linux-libc-dev | CVE-2023-53561 | MEDIUM | 5.15.0-161.171 |  | kernel: net: wwan: iosm: fix NULL pointer dereference when removing device |
| linux-libc-dev | CVE-2023-53562 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm: fix vram leak on bind errors |
| linux-libc-dev | CVE-2023-53574 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw88: delete timer and free skb queue when unloading |
| linux-libc-dev | CVE-2023-53575 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: mvm: fix potential array out of bounds access |
| linux-libc-dev | CVE-2023-53584 | MEDIUM | 5.15.0-161.171 |  | kernel: ubifs: ubifs_releasepage: Remove ubifs_assert(0) to valid this process |
| linux-libc-dev | CVE-2023-53588 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211: check for station first in client probe |
| linux-libc-dev | CVE-2023-53596 | MEDIUM | 5.15.0-161.171 |  | kernel: drivers: base: Free devm resources when unregistering a device |
| linux-libc-dev | CVE-2023-53602 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath11k: fix memory leak in WMI firmware stats |
| linux-libc-dev | CVE-2023-53609 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: Revert "scsi: core: Do not increase scsi_device's iorequest_cnt if dispatch failed" |
| linux-libc-dev | CVE-2023-53620 | MEDIUM | 5.15.0-161.171 |  | kernel: md: fix soft lockup in status_resync |
| linux-libc-dev | CVE-2023-53627 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: hisi_sas: Grab sas_dev lock when traversing the members of sas_dev.list |
| linux-libc-dev | CVE-2023-53628 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: drop gfx_v11_0_cp_ecc_error_irq_funcs |
| linux-libc-dev | CVE-2023-53629 | MEDIUM | 5.15.0-161.171 |  | kernel: fs: dlm: fix use after free in midcomms commit |
| linux-libc-dev | CVE-2023-53635 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: conntrack: fix wrong ct->timeout value |
| linux-libc-dev | CVE-2023-53647 | MEDIUM | 5.15.0-161.171 |  | kernel: Drivers: hv: vmbus: Don't dereference ACPI root object handle |
| linux-libc-dev | CVE-2023-53651 | MEDIUM | 5.15.0-161.171 |  | Input: exc3000 - properly stop timer on shutdown |
| linux-libc-dev | CVE-2023-53657 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: Don't tx before switchdev is fully configured |
| linux-libc-dev | CVE-2023-53662 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: fix memory leaks in ext4_fname_{setup_filename,prepare_lookup} |
| linux-libc-dev | CVE-2023-53671 | MEDIUM | 5.15.0-161.171 |  | kernel: srcu: Delegate work to the boot cpu if using SRCU_SIZE_SMALL |
| linux-libc-dev | CVE-2023-53673 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: hci_event: call disconnect callback before deleting conn |
| linux-libc-dev | CVE-2023-53682 | MEDIUM | 5.15.0-161.171 |  | kernel: hwmon: (xgene) Fix ioremap and memremap leak |
| linux-libc-dev | CVE-2023-53685 | MEDIUM | 5.15.0-161.171 |  | kernel: tun: Fix memory leak for detached NAPI queue |
| linux-libc-dev | CVE-2023-53694 | MEDIUM | 5.15.0-161.171 |  | kernel: riscv: ftrace: Fixup panic by disabling preemption |
| linux-libc-dev | CVE-2023-53702 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/crypto: use vector instructions only if available for ChaCha20 |
| linux-libc-dev | CVE-2023-53707 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Fix integer overflow in amdgpu_cs_pass1 |
| linux-libc-dev | CVE-2023-53714 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/stm: ltdc: fix late dereference check |
| linux-libc-dev | CVE-2023-53721 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Fix a NULL pointer dereference in ath12k_mac_op_hw_scan() |
| linux-libc-dev | CVE-2023-53733 | MEDIUM | 5.15.0-161.171 |  | kernel: net: sched: cls_u32: Undo tcf_bind_filter if u32_replace_hw_knode |
| linux-libc-dev | CVE-2023-6610 | MEDIUM | 5.15.0-161.171 |  | kernel: OOB Access in smb2_dump_detail |
| linux-libc-dev | CVE-2024-26595 | MEDIUM | 5.15.0-161.171 |  | kernel: mlxsw: spectrum_acl_tcam: Fix NULL pointer dereference in error path |
| linux-libc-dev | CVE-2024-26605 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI/ASPM: Fix deadlock when enabling ASPM |
| linux-libc-dev | CVE-2024-26647 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix late dereference 'dsc' check in 'link_set_dsc_pps_packet()' |
| linux-libc-dev | CVE-2024-26648 | MEDIUM | 5.15.0-161.171 |  | kernel: NULL check in edp_setup_replay() |
| linux-libc-dev | CVE-2024-26656 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: use-after-free vulnerability |
| linux-libc-dev | CVE-2024-26658 | MEDIUM | 5.15.0-161.171 |  | kernel: bcachefs: grab s_umount only if snapshotting |
| linux-libc-dev | CVE-2024-26662 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: 'panel_cntl' could be null in 'dcn21_set_backlight_level()' |
| linux-libc-dev | CVE-2024-26672 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: variable 'mca_funcs' dereferenced before NULL check in 'amdgpu_mca_smu_get_mca_entry()' |
| linux-libc-dev | CVE-2024-26691 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: arm64: Fix circular locking dependency |
| linux-libc-dev | CVE-2024-26699 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix array-index-out-of-bounds in dcn35_clkmgr |
| linux-libc-dev | CVE-2024-26714 | MEDIUM | 5.15.0-161.171 |  | kernel: interconnect: qcom: sc8180x: Mark CO0 BCM keepalive |
| linux-libc-dev | CVE-2024-26719 | MEDIUM | 5.15.0-161.171 |  | kernel: nouveau: offload fence uevents work to workqueue |
| linux-libc-dev | CVE-2024-26740 | MEDIUM | 5.15.0-161.171 |  | kernel: net/sched: act_mirred: use the backlog for mirred ingress |
| linux-libc-dev | CVE-2024-26742 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: smartpqi: Fix disable_managed_interrupts |
| linux-libc-dev | CVE-2024-26756 | MEDIUM | 5.15.0-161.171 |  | kernel: md: Don't register sync_thread for reshape directly |
| linux-libc-dev | CVE-2024-26757 | MEDIUM | 5.15.0-161.171 |  | kernel: md: Don't ignore read-only array in md_check_recovery() |
| linux-libc-dev | CVE-2024-26758 | MEDIUM | 5.15.0-161.171 |  | kernel: md: Don't ignore suspended array in md_check_recovery() |
| linux-libc-dev | CVE-2024-26759 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/swap: fix race when skipping swapcache |
| linux-libc-dev | CVE-2024-26767 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: fixed integer types and null check locations |
| linux-libc-dev | CVE-2024-26770 | MEDIUM | 5.15.0-161.171 |  | kernel: HID: nvidia-shield: Add missing null pointer checks to LED initialization |
| linux-libc-dev | CVE-2024-26807 | MEDIUM | 5.15.0-161.171 |  | kernel: spi: cadence-qspi: fix pointer reference in runtime PM hooks |
| linux-libc-dev | CVE-2024-26842 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: core: Fix shift issue in ufshcd_clear_cmd() |
| linux-libc-dev | CVE-2024-26844 | MEDIUM | 5.15.0-161.171 |  | kernel: block: Fix WARNING in _copy_from_iter |
| linux-libc-dev | CVE-2024-26853 | MEDIUM | 5.15.0-161.171 |  | kernel: igc: avoid returning frame twice in XDP_REDIRECT |
| linux-libc-dev | CVE-2024-26866 | MEDIUM | 5.15.0-161.171 |  | kernel: spi: lpspi: Avoid potential use-after-free in probe() |
| linux-libc-dev | CVE-2024-26869 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to truncate meta inode pages forcely |
| linux-libc-dev | CVE-2024-26876 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/bridge: adv7511: fix crash on irq during probe |
| linux-libc-dev | CVE-2024-26938 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/i915/bios: Tolerate devdata==NULL in intel_bios_encoder_supports_dp_dual_mode() |
| linux-libc-dev | CVE-2024-26948 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add a dc_state NULL check in dc_state_release |
| linux-libc-dev | CVE-2024-26953 | MEDIUM | 5.15.0-161.171 |  | kernel: net: esp: fix bad handling of pages from page_pool |
| linux-libc-dev | CVE-2024-26954 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix slab-out-of-bounds in smb_strndup_from_utf16() |
| linux-libc-dev | CVE-2024-27002 | MEDIUM | 5.15.0-161.171 |  | kernel: clk: mediatek: Do a runtime PM get on controllers during probe |
| linux-libc-dev | CVE-2024-27005 | MEDIUM | 5.15.0-161.171 |  | kernel: interconnect: Don&#39;t access req_list while it&#39;s being manipulated |
| linux-libc-dev | CVE-2024-27014 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Prevent deadlock while disabling aRFS |
| linux-libc-dev | CVE-2024-27025 | MEDIUM | 5.15.0-161.171 |  | kernel: nbd: null check for nla_nest_start |
| linux-libc-dev | CVE-2024-27032 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to avoid potential panic during recovery |
| linux-libc-dev | CVE-2024-27035 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: compress: fix to guarantee persisting compressed blocks by CP |
| linux-libc-dev | CVE-2024-27041 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: fix NULL checks for adev-&gt;dm.dc in amdgpu_dm_fini() |
| linux-libc-dev | CVE-2024-27056 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: mvm: ensure offloading TID queue exists |
| linux-libc-dev | CVE-2024-27057 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: SOF: ipc4-pcm: Workaround for crashed firmware on system suspend |
| linux-libc-dev | CVE-2024-27062 | MEDIUM | 5.15.0-161.171 |  | kernel: nouveau: lock the client object tree. |
| linux-libc-dev | CVE-2024-27389 | MEDIUM | 5.15.0-161.171 |  | kernel: pstore: inode: Only d_invalidate() is needed |
| linux-libc-dev | CVE-2024-27400 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: once more fix the call oder in amdgpu_ttm_move() v2 |
| linux-libc-dev | CVE-2024-27408 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: dw-edma: eDMA: Add sync read before starting the DMA transfer in remote setup |
| linux-libc-dev | CVE-2024-27418 | MEDIUM | 5.15.0-161.171 |  | kernel: net: mctp: take ownership of skb in mctp_local_output |
| linux-libc-dev | CVE-2024-27435 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme: fix reconnection fail due to reserved tag allocation |
| linux-libc-dev | CVE-2024-35784 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix deadlock with fiemap and extent locking |
| linux-libc-dev | CVE-2024-35794 | MEDIUM | 5.15.0-161.171 |  | kernel: dm-raid: really frozen sync_thread during suspend |
| linux-libc-dev | CVE-2024-35799 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Prevent crash when disable stream |
| linux-libc-dev | CVE-2024-35801 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/fpu: Keep xfd_state in sync with MSR_IA32_XFD |
| linux-libc-dev | CVE-2024-35803 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/efistub: Call mixed mode boot services on the firmware&#39;s stack |
| linux-libc-dev | CVE-2024-35808 | MEDIUM | 5.15.0-161.171 |  | kernel: md/dm-raid: don&#39;t call md_reap_sync_thread() directly |
| linux-libc-dev | CVE-2024-35826 | MEDIUM | 5.15.0-161.171 |  | kernel: block: Fix page refcounts for unaligned buffers in __bio_release_pages() |
| linux-libc-dev | CVE-2024-35832 | MEDIUM | 5.15.0-161.171 |  | kernel: bcachefs: kvfree bch_fs::snapshots in bch2_fs_snapshots_exit |
| linux-libc-dev | CVE-2024-35839 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: bridge: replace physindev with physinif in nf_bridge_info |
| linux-libc-dev | CVE-2024-35843 | MEDIUM | 5.15.0-161.171 |  | kernel: iommu/vt-d: Use device rbtree in iopf reporting path |
| linux-libc-dev | CVE-2024-35861 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix potential UAF in cifs_signal_cifsd_for_reconnect() |
| linux-libc-dev | CVE-2024-35862 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix potential UAF in smb2_is_network_name_deleted() |
| linux-libc-dev | CVE-2024-35865 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix potential UAF in smb2_is_valid_oplock_break() |
| linux-libc-dev | CVE-2024-35868 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix potential UAF in cifs_stats_proc_write() |
| linux-libc-dev | CVE-2024-35875 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/coco: Require seeding RNG with RDRAND on CoCo systems |
| linux-libc-dev | CVE-2024-35878 | MEDIUM | 5.15.0-161.171 |  | kernel: of: module: prevent NULL pointer dereference in vsnprintf() |
| linux-libc-dev | CVE-2024-35908 | MEDIUM | 5.15.0-161.171 |  | kernel: tls: get psock ref after taking rxlock to avoid leak |
| linux-libc-dev | CVE-2024-35924 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: typec: ucsi: Limit read size on v1.2 |
| linux-libc-dev | CVE-2024-35926 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: iaa - Fix async_disable descriptor leak |
| linux-libc-dev | CVE-2024-35931 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Skip do PCI error slot reset during RAS recovery |
| linux-libc-dev | CVE-2024-35932 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vc4: don't check if plane->state->fb == state->fb |
| linux-libc-dev | CVE-2024-35937 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: cfg80211: check A-MSDU format more carefully |
| linux-libc-dev | CVE-2024-35939 | MEDIUM | 5.15.0-161.171 |  | kernel: dma-direct: Leak pages on dma_set_decrypted() failure |
| linux-libc-dev | CVE-2024-35942 | MEDIUM | 5.15.0-161.171 |  | kernel: pmdomain: imx8mp-blk-ctrl: imx8mp_blk: Add fdcc clock to hdmimix domain |
| linux-libc-dev | CVE-2024-35945 | MEDIUM | 5.15.0-161.171 |  | kernel: net: phy: phy_device: Prevent nullptr exceptions on ISR |
| linux-libc-dev | CVE-2024-35946 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: fix null pointer access when abort scan |
| linux-libc-dev | CVE-2024-35949 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: make sure that WRITTEN is set on all metadata blocks |
| linux-libc-dev | CVE-2024-35956 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: qgroup: fix qgroup prealloc rsv leak in subvolume operations |
| linux-libc-dev | CVE-2024-35959 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Fix mlx5e_priv_init() cleanup flow |
| linux-libc-dev | CVE-2024-35971 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ks8851: Handle softirqs at the end of IRQ thread to fix hang |
| linux-libc-dev | CVE-2024-35995 | MEDIUM | 5.15.0-161.171 |  | kernel: ACPI: CPPC: Use access_width over bit_width for system memory accesses |
| linux-libc-dev | CVE-2024-35998 | MEDIUM | 5.15.0-161.171 |  | kernel: smb3: fix lock ordering potential deadlock in cifs_sync_mid_result |
| linux-libc-dev | CVE-2024-35999 | MEDIUM | 5.15.0-161.171 |  | kernel: smb3: missing lock when picking channel |
| linux-libc-dev | CVE-2024-36000 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/hugetlb: fix missing hugetlb_lock for resv uncharge |
| linux-libc-dev | CVE-2024-36003 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: fix LAG and VF lock dependency in ice_reset_vf() |
| linux-libc-dev | CVE-2024-36009 | MEDIUM | 5.15.0-161.171 |  | kernel: ax25: Fix netdev refcount issue |
| linux-libc-dev | CVE-2024-36012 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: msft: fix slab-use-after-free in msft_do_close() |
| linux-libc-dev | CVE-2024-36013 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: L2CAP: Fix slab-use-after-free in l2cap_connect() |
| linux-libc-dev | CVE-2024-36021 | MEDIUM | 5.15.0-161.171 |  | kernel: net: hns3: fix kernel crash when devlink reload during pf initialization |
| linux-libc-dev | CVE-2024-36024 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Disable idle reallow as part of command/gpint execution |
| linux-libc-dev | CVE-2024-36026 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/pm: fixes a random hang in S4 for SMU v13.0.4/11 |
| linux-libc-dev | CVE-2024-36244 | MEDIUM | 5.15.0-161.171 |  | kernel: net/sched: taprio: extend minimum interval restriction to entire cycle too |
| linux-libc-dev | CVE-2024-36331 | MEDIUM | 5.15.0-161.171 |  | Improper initialization of CPU cache memory could allow a privileged a ... |
| linux-libc-dev | CVE-2024-36347 | MEDIUM | 5.15.0-161.171 |  | kernel: hw:amd: Improper signature verification in AMD CPU ROM microcode patch loader |
| linux-libc-dev | CVE-2024-36350 | MEDIUM | 5.15.0-161.171 |  | kernel: information leak via transient execution vulnerability in some AMD processors |
| linux-libc-dev | CVE-2024-36357 | MEDIUM | 5.15.0-161.171 |  | kernel: transient execution vulnerability in some AMD processors |
| linux-libc-dev | CVE-2024-36478 | MEDIUM | 5.15.0-161.171 |  | kernel: null_blk: fix null-ptr-dereference while configuring &#39;power&#39; and &#39;submit_queues&#39; |
| linux-libc-dev | CVE-2024-36479 | MEDIUM | 5.15.0-161.171 |  | kernel: fpga: bridge: add owner module and take its refcount |
| linux-libc-dev | CVE-2024-36898 | MEDIUM | 5.15.0-161.171 |  | kernel: gpiolib: cdev: fix uninitialised kfifo |
| linux-libc-dev | CVE-2024-36900 | MEDIUM | 5.15.0-161.171 |  | kernel: net: hns3: fix kernel crash when devlink reload during initialization |
| linux-libc-dev | CVE-2024-36903 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv6: Fix potential uninit-value access in __ip6_make_skb() |
| linux-libc-dev | CVE-2024-36909 | MEDIUM | 5.15.0-161.171 |  | kernel: Drivers: hv: vmbus: Don&#39;t free ring buffers that couldn&#39;t be re-encrypted |
| linux-libc-dev | CVE-2024-36910 | MEDIUM | 5.15.0-161.171 |  | kernel: uio_hv_generic: Don&#39;t free decrypted memory |
| linux-libc-dev | CVE-2024-36911 | MEDIUM | 5.15.0-161.171 |  | kernel: hv_netvsc: Don&#39;t free decrypted memory |
| linux-libc-dev | CVE-2024-36914 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Skip on writeback when it&#39;s not applicable |
| linux-libc-dev | CVE-2024-36915 | MEDIUM | 5.15.0-161.171 |  | kernel: nfc: llcp: fix nfc_llcp_setsockopt() unsafe copies |
| linux-libc-dev | CVE-2024-36917 | MEDIUM | 5.15.0-161.171 |  | kernel: block: fix overflow in blk_ioctl_discard() |
| linux-libc-dev | CVE-2024-36918 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Check bloom filter map value size |
| linux-libc-dev | CVE-2024-36920 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Avoid memcpy field-spanning write WARNING |
| linux-libc-dev | CVE-2024-36921 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: mvm: guard against invalid STA ID on removal |
| linux-libc-dev | CVE-2024-36922 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: read txq-&gt;read_ptr under lock |
| linux-libc-dev | CVE-2024-36923 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/9p: fix uninitialized values during inode evict |
| linux-libc-dev | CVE-2024-36924 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: lpfc: Release hbalock before calling lpfc_worker_wake_up() |
| linux-libc-dev | CVE-2024-36927 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv4: Fix uninit-value access in __ip_make_skb() |
| linux-libc-dev | CVE-2024-36948 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe/xe_migrate: Cast to output precision before multiplying operands |
| linux-libc-dev | CVE-2024-36949 | MEDIUM | 5.15.0-161.171 |  | kernel: amd/amdkfd: sync all devices to wait all processes being evicted |
| linux-libc-dev | CVE-2024-36951 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: range check cp bad op exception interrupts |
| linux-libc-dev | CVE-2024-36966 | MEDIUM | 5.15.0-161.171 |  | kernel: erofs: reliably distinguish block based and fscache mode |
| linux-libc-dev | CVE-2024-37021 | MEDIUM | 5.15.0-161.171 |  | kernel: fpga: manager: add owner module and take its refcount |
| linux-libc-dev | CVE-2024-37354 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix crash on racing fsync and size-extending write into prealloc |
| linux-libc-dev | CVE-2024-38306 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: protect folio::private when attaching extent buffer folios |
| linux-libc-dev | CVE-2024-38543 | MEDIUM | 5.15.0-161.171 |  | kernel: lib/test_hmm.c: handle src_pfns and dst_pfns allocation failure |
| linux-libc-dev | CVE-2024-38554 | MEDIUM | 5.15.0-161.171 |  | kernel: ax25: Fix reference count leak issue of net_device |
| linux-libc-dev | CVE-2024-38556 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: Add a timeout to acquire the command queue semaphore |
| linux-libc-dev | CVE-2024-38557 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: Reload only IB representors upon lag disable/enable |
| linux-libc-dev | CVE-2024-38564 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Add BPF_PROG_TYPE_CGROUP_SKB attach type enforcement in BPF_LINK_CREATE |
| linux-libc-dev | CVE-2024-38594 | MEDIUM | 5.15.0-161.171 |  | kernel: net: stmmac: move the EST lock to struct stmmac_priv |
| linux-libc-dev | CVE-2024-38608 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Fix netif state handling |
| linux-libc-dev | CVE-2024-38625 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/ntfs3: Check &#39;folio&#39; pointer for NULL |
| linux-libc-dev | CVE-2024-38628 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: u_audio: Fix race condition use of controls after free during gadget unbind. |
| linux-libc-dev | CVE-2024-39282 | MEDIUM | 5.15.0-161.171 |  | kernel: net: wwan: t7xx: Fix FSM command timeout issue |
| linux-libc-dev | CVE-2024-39293 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert &#34;xsk: Support redirect to any socket bound to the same umem&#34; |
| linux-libc-dev | CVE-2024-39298 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/memory-failure: fix handling of dissolved but not taken off from buddy pages |
| linux-libc-dev | CVE-2024-39508 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring/io-wq: Use set_bit() and test_bit() at worker->flags |
| linux-libc-dev | CVE-2024-40900 | MEDIUM | 5.15.0-161.171 |  | kernel: cachefiles: remove requests from xarray during flushing requests |
| linux-libc-dev | CVE-2024-40918 | MEDIUM | 5.15.0-161.171 |  | kernel: parisc: Try to fix random segmentation faults in package builds |
| linux-libc-dev | CVE-2024-40954 | MEDIUM | 5.15.0-161.171 |  | kernel: net: do not leave a dangling sk pointer, when socket creation fails |
| linux-libc-dev | CVE-2024-40966 | MEDIUM | 5.15.0-161.171 |  | kernel: tty: add the option to have a tty reject a new ldisc |
| linux-libc-dev | CVE-2024-40972 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: do not create EA inode under buffer lock |
| linux-libc-dev | CVE-2024-40975 | MEDIUM | 5.15.0-161.171 |  | kernel: platform/x86: x86-android-tablets: Unregister devices in reverse order |
| linux-libc-dev | CVE-2024-40977 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mt76: mt7921s: fix potential hung tasks during chip recovery |
| linux-libc-dev | CVE-2024-40979 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: fix kernel crash during resume |
| linux-libc-dev | CVE-2024-40989 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: arm64: Disassociate vcpus from redistributor region on teardown |
| linux-libc-dev | CVE-2024-40998 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: fix uninitialized ratelimit_state-&gt;lock access in __ext4_fill_super() |
| linux-libc-dev | CVE-2024-40999 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ena: Add validation for completion descriptors consistency |
| linux-libc-dev | CVE-2024-41001 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring/sqpoll: work around a potential audit memory leak |
| linux-libc-dev | CVE-2024-41008 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: change vm-&gt;task_info handling |
| linux-libc-dev | CVE-2024-41013 | MEDIUM | 5.15.0-161.171 |  | kernel: xfs: don&#39;t walk off the end of a directory data block |
| linux-libc-dev | CVE-2024-41014 | MEDIUM | 5.15.0-161.171 |  | kernel: xfs: add bounds checking to xlog_recover_process_data |
| linux-libc-dev | CVE-2024-41023 | MEDIUM | 5.15.0-161.171 |  | kernel: sched/deadline: Fix task_struct reference leak |
| linux-libc-dev | CVE-2024-41030 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: discard write access to the directory open |
| linux-libc-dev | CVE-2024-41031 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/filemap: skip to create PMD-sized page cache if needed |
| linux-libc-dev | CVE-2024-41036 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ks8851: Fix deadlock with the SPI chip variant |
| linux-libc-dev | CVE-2024-41045 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Defer work in bpf_timer_cancel_and_free |
| linux-libc-dev | CVE-2024-41050 | MEDIUM | 5.15.0-161.171 |  | kernel: cachefiles: cyclic allocation of msg_id to avoid reuse |
| linux-libc-dev | CVE-2024-41062 | MEDIUM | 5.15.0-161.171 |  | kernel: bluetooth/l2cap: sync sock recv cb and release |
| linux-libc-dev | CVE-2024-41067 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: scrub: handle RST lookup error correctly |
| linux-libc-dev | CVE-2024-41069 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: topology: Fix references to freed memory |
| linux-libc-dev | CVE-2024-41074 | MEDIUM | 5.15.0-161.171 |  | kernel: cachefiles: Set object to close if ondemand_id &lt; 0 in copen |
| linux-libc-dev | CVE-2024-41075 | MEDIUM | 5.15.0-161.171 |  | kernel: cachefiles: add consistency check for copen/cread |
| linux-libc-dev | CVE-2024-41079 | MEDIUM | 5.15.0-161.171 |  | kernel: nvmet: always initialize cqe.result |
| linux-libc-dev | CVE-2024-41082 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme-fabrics: use reserved tag for reg read/write command |
| linux-libc-dev | CVE-2024-41088 | MEDIUM | 5.15.0-161.171 |  | kernel: can: mcp251xfd: fix infinite loop when xmit fails |
| linux-libc-dev | CVE-2024-41935 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to shrink read extent node in batches |
| linux-libc-dev | CVE-2024-42067 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Take return from set_memory_rox() into account with bpf_jit_binary_lock_ro() |
| linux-libc-dev | CVE-2024-42091 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe: Check pat.ops before dumping PAT settings |
| linux-libc-dev | CVE-2024-42107 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: Don't process extts if PTP is disabled |
| linux-libc-dev | CVE-2024-42110 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ntb_netdev: Move ntb_netdev_rx_handler() to call netif_rx() from __netif_rx() |
| linux-libc-dev | CVE-2024-42117 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: ASSERT when failing to find index by plane/stream id |
| linux-libc-dev | CVE-2024-42118 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Do not return negative stream id for array |
| linux-libc-dev | CVE-2024-42122 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL pointer check for kzalloc |
| linux-libc-dev | CVE-2024-42125 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: fw: scan offload prohibit all 6 GHz channel if no 6 GHz sband |
| linux-libc-dev | CVE-2024-42128 | MEDIUM | 5.15.0-161.171 |  | kernel: leds: an30259a: Use devm_mutex_init() for mutex initialization |
| linux-libc-dev | CVE-2024-42129 | MEDIUM | 5.15.0-161.171 |  | kernel: leds: mlxreg: Use devm_mutex_init() for mutex initialization |
| linux-libc-dev | CVE-2024-42135 | MEDIUM | 5.15.0-161.171 |  | kernel: vhost_task: Handle SIGKILL by flushing work and exiting |
| linux-libc-dev | CVE-2024-42139 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: Fix improper extts handling |
| linux-libc-dev | CVE-2024-42147 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: hisilicon/debugfs - Fix debugfs uninit process issue |
| linux-libc-dev | CVE-2024-42155 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/pkey: Wipe copies of protected- and secure-keys |
| linux-libc-dev | CVE-2024-42239 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fail bpf_timer_cancel when callback is being cancelled |
| linux-libc-dev | CVE-2024-42253 | MEDIUM | 5.15.0-161.171 |  | kernel: gpio: pca953x: fix pca953x_irq_bus_sync_unlock race |
| linux-libc-dev | CVE-2024-42273 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: assign CURSEG_ALL_DATA_ATGC if blkaddr is valid |
| linux-libc-dev | CVE-2024-42319 | MEDIUM | 5.15.0-161.171 |  | kernel: mailbox: mtk-cmdq: Move devm_mbox_controller_register() after devm_pm_runtime_enable() |
| linux-libc-dev | CVE-2024-42320 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/dasd: fix error checks in dasd_copy_pair_store() |
| linux-libc-dev | CVE-2024-42321 | MEDIUM | 5.15.0-161.171 |  | kernel: net: flow_dissector: use DEBUG_NET_WARN_ON_ONCE |
| linux-libc-dev | CVE-2024-43823 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI: keystone: Fix NULL pointer dereference in case of DT error in ks_pcie_setup_rc_app_regs() |
| linux-libc-dev | CVE-2024-43824 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI: endpoint: pci-epf-test: Make use of cached &#39;epc_features&#39; in pci_epf_test_core_init() |
| linux-libc-dev | CVE-2024-43831 | MEDIUM | 5.15.0-161.171 |  | kernel: media: mediatek: vcodec: Handle invalid decoder vsi |
| linux-libc-dev | CVE-2024-43832 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/uv: Don't call folio_wait_writeback() without a folio reference |
| linux-libc-dev | CVE-2024-43842 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: Fix array index mistake in rtw89_sta_info_get_iter() |
| linux-libc-dev | CVE-2024-43844 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi rtw89 wow: fix GTK offload H2C skbuff issue |
| linux-libc-dev | CVE-2024-43866 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: Always drain health in shutdown callback |
| linux-libc-dev | CVE-2024-43872 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/hns: Fix soft lockup under heavy CEQE load |
| linux-libc-dev | CVE-2024-43899 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix null pointer deref in dcn20_resource.c |
| linux-libc-dev | CVE-2024-43911 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211: fix NULL dereference at band check in starting tx ba session |
| linux-libc-dev | CVE-2024-43912 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: nl80211: disallow setting special AP channel widths |
| linux-libc-dev | CVE-2024-44950 | MEDIUM | 5.15.0-161.171 |  | kernel: serial: sc16is7xx: fix invalid FIFO access with special register set |
| linux-libc-dev | CVE-2024-44961 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Forward soft recovery errors to userspace |
| linux-libc-dev | CVE-2024-44962 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: btnxpuart: Shutdown timer and prevent rearming when driver unloading |
| linux-libc-dev | CVE-2024-44963 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: do not BUG_ON() when freeing tree block after error |
| linux-libc-dev | CVE-2024-44970 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: SHAMPO, Fix invalid WQ linked list unlink |
| linux-libc-dev | CVE-2024-44972 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: do not clear page dirty inside extent_write_locked_range() |
| linux-libc-dev | CVE-2024-45010 | MEDIUM | 5.15.0-161.171 |  | kernel: mptcp: pm: only mark 'subflow' endp as available |
| linux-libc-dev | CVE-2024-45015 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm/dpu: move dpu_encoder&#39;s connector assignment to atomic_enable() |
| linux-libc-dev | CVE-2024-46678 | MEDIUM | 5.15.0-161.171 |  | kernel: bonding: change ipsec_lock from spin lock to mutex |
| linux-libc-dev | CVE-2024-46681 | MEDIUM | 5.15.0-161.171 |  | kernel: pktgen: use cpus_read_lock() in pg_net_init() |
| linux-libc-dev | CVE-2024-46705 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe: reset mmio mappings with devm |
| linux-libc-dev | CVE-2024-46715 | MEDIUM | 5.15.0-161.171 |  | kernel: driver: iio: add missing checks on iio_info&#39;s callback access |
| linux-libc-dev | CVE-2024-46716 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: altera-msgdma: properly free descriptor in msgdma_free_descriptor |
| linux-libc-dev | CVE-2024-46717 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: SHAMPO, Fix incorrect page release |
| linux-libc-dev | CVE-2024-46718 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe: Don&#39;t overmap identity VRAM mapping |
| linux-libc-dev | CVE-2024-46720 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: fix dereference after null check |
| linux-libc-dev | CVE-2024-46726 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Ensure index calculation will not overflow |
| linux-libc-dev | CVE-2024-46727 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add otg_master NULL check within resource_log_pipe_topology_update |
| linux-libc-dev | CVE-2024-46728 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check index for aux_rd_interval before using |
| linux-libc-dev | CVE-2024-46729 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix incorrect size calculation for loop |
| linux-libc-dev | CVE-2024-46730 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Ensure array index tg_inst won&#39;t be -1 |
| linux-libc-dev | CVE-2024-46733 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix qgroup reserve leaks in cow_file_range |
| linux-libc-dev | CVE-2024-46748 | MEDIUM | 5.15.0-161.171 |  | kernel: cachefiles: Set the max subreq size for cache writes to MAX_RW_COUNT |
| linux-libc-dev | CVE-2024-46749 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: btnxpuart: Fix Null pointer dereference in btnxpuart_flush() |
| linux-libc-dev | CVE-2024-46754 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Remove tst_run from lwt_seg6local_prog_ops. |
| linux-libc-dev | CVE-2024-46762 | MEDIUM | 5.15.0-161.171 |  | kernel: xen: privcmd: Fix possible access to a freed kirqfd instance |
| linux-libc-dev | CVE-2024-46765 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: protect XDP configuration with a mutex |
| linux-libc-dev | CVE-2024-46770 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: Add netif_device_attach/detach into PF reset flow |
| linux-libc-dev | CVE-2024-46775 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Validate function returns |
| linux-libc-dev | CVE-2024-46802 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: added NULL check at start of dc_validate_stream |
| linux-libc-dev | CVE-2024-46803 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Check debug trap enable before write dbg_ev_file |
| linux-libc-dev | CVE-2024-46806 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Fix the warning division or modulo by zero |
| linux-libc-dev | CVE-2024-46808 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add missing NULL pointer check within dpcd_extend_address_range |
| linux-libc-dev | CVE-2024-46811 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix index may exceed array range within fpu_update_bw_bounding_box |
| linux-libc-dev | CVE-2024-46813 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check link_index before accessing dc-&gt;links[] |
| linux-libc-dev | CVE-2024-46820 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu/vcn: remove irq disabling in vcn 5 suspend |
| linux-libc-dev | CVE-2024-46823 | MEDIUM | 5.15.0-161.171 |  | kernel: kunit/overflow: Fix UB in overflow_allocation_test |
| linux-libc-dev | CVE-2024-46830 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: x86: Acquire kvm-&gt;srcu when handling KVM_SET_VCPU_EVENTS |
| linux-libc-dev | CVE-2024-46833 | MEDIUM | 5.15.0-161.171 |  | kernel: net: hns3: void array out of bound when loop tnl_num |
| linux-libc-dev | CVE-2024-46834 | MEDIUM | 5.15.0-161.171 |  | kernel: ethtool: fail closed if we can&#39;t get max channel used in indirection tables |
| linux-libc-dev | CVE-2024-46835 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Fix smatch static checker warning |
| linux-libc-dev | CVE-2024-46836 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: aspeed_udc: validate endpoint index for ast udc |
| linux-libc-dev | CVE-2024-46842 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: lpfc: Handle mailbox timeouts in lpfc_get_sfp_info |
| linux-libc-dev | CVE-2024-46843 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: core: Remove SCSI host only if added |
| linux-libc-dev | CVE-2024-46848 | MEDIUM | 5.15.0-161.171 |  | kernel: perf/x86/intel: Limit the period on Haswell |
| linux-libc-dev | CVE-2024-46857 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: Fix bridge mode operations when there are no VFs |
| linux-libc-dev | CVE-2024-46860 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mt76: mt7921: fix NULL pointer access in mt7921_ipv6_addr_change |
| linux-libc-dev | CVE-2024-46861 | MEDIUM | 5.15.0-161.171 |  | kernel: usbnet: ipheth: do not stop RX on failing RX callback |
| linux-libc-dev | CVE-2024-46870 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Disable DMCUB timeout for DCN35 |
| linux-libc-dev | CVE-2024-47141 | MEDIUM | 5.15.0-161.171 |  | kernel: pinmux: Use sequential access to access desc->pinmux data |
| linux-libc-dev | CVE-2024-47658 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: stm32/cryp - call finalize with bh disabled |
| linux-libc-dev | CVE-2024-47661 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Avoid overflow from uint32_t to uint8_t |
| linux-libc-dev | CVE-2024-47662 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Remove register from DCN35 DMCUB diagnostic collection |
| linux-libc-dev | CVE-2024-47664 | MEDIUM | 5.15.0-161.171 |  | kernel: spi: hisi-kunpeng: Add verification for the max_frequency provided by the firmware |
| linux-libc-dev | CVE-2024-47666 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: pm80xx: Set phy-&gt;enable_completion only when we wait for it |
| linux-libc-dev | CVE-2024-47678 | MEDIUM | 5.15.0-161.171 |  | kernel: icmp: change the order of rate limits |
| linux-libc-dev | CVE-2024-47683 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Skip Recompute DSC Params if no Stream on Link |
| linux-libc-dev | CVE-2024-47689 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to don&#39;t set SB_RDONLY in f2fs_handle_critical_error() |
| linux-libc-dev | CVE-2024-47703 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf, lsm: Add check for BPF LSM return value |
| linux-libc-dev | CVE-2024-47704 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check link_res-&gt;hpo_dp_link_enc before using it |
| linux-libc-dev | CVE-2024-47728 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Zero former ARG_PTR_TO_{LONG,INT} args in case of error |
| linux-libc-dev | CVE-2024-47736 | MEDIUM | 5.15.0-161.171 |  | kernel: erofs: handle overlapped pclusters out of crafted images properly |
| linux-libc-dev | CVE-2024-47738 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211: don&#39;t use rate mask for offchannel TX either |
| linux-libc-dev | CVE-2024-47745 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: call the security_mmap_file() LSM hook in remap_file_pages() |
| linux-libc-dev | CVE-2024-47794 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Prevent tailcall infinite loop caused by freplace |
| linux-libc-dev | CVE-2024-47809 | MEDIUM | 5.15.0-161.171 |  | kernel: dlm: fix possible lkb_resource null dereference |
| linux-libc-dev | CVE-2024-48873 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: check return value of ieee80211_probereq_get() for RNR |
| linux-libc-dev | CVE-2024-48875 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: don't take dev_replace rwsem on task already holding it |
| linux-libc-dev | CVE-2024-49568 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: check v2_ext_offset/eid_cnt/ism_gid_cnt when receiving proposal msg |
| linux-libc-dev | CVE-2024-49569 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme-rdma: unquiesce admin_q before destroy it |
| linux-libc-dev | CVE-2024-49855 | MEDIUM | 5.15.0-161.171 |  | kernel: nbd: fix race between timeout and normal completion |
| linux-libc-dev | CVE-2024-49859 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to check atomic_file in f2fs ioctl interfaces |
| linux-libc-dev | CVE-2024-49861 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix helper writes to read-only maps |
| linux-libc-dev | CVE-2024-49870 | MEDIUM | 5.15.0-161.171 |  | kernel: cachefiles: fix dentry leak in cachefiles_open_file() |
| linux-libc-dev | CVE-2024-49880 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: fix off by one issue in alloc_flex_gd() |
| linux-libc-dev | CVE-2024-49888 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix a sdiv overflow issue |
| linux-libc-dev | CVE-2024-49891 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: lpfc: Validate hdwq pointers before dereferencing in reset/errata paths |
| linux-libc-dev | CVE-2024-49893 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check stream_status before it is used |
| linux-libc-dev | CVE-2024-49898 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check null-initialized variables |
| linux-libc-dev | CVE-2024-49899 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Initialize denominators' default to 1 |
| linux-libc-dev | CVE-2024-49901 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm/adreno: Assign msm_gpu-&gt;pdev earlier to avoid nullptrs |
| linux-libc-dev | CVE-2024-49904 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: add list empty check to avoid null pointer issue |
| linux-libc-dev | CVE-2024-49905 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add null check for &#39;afb&#39; in amdgpu_dm_plane_handle_cursor_update (v2) |
| linux-libc-dev | CVE-2024-49906 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check null pointer before try to access it |
| linux-libc-dev | CVE-2024-49908 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add null check for &#39;afb&#39; in amdgpu_dm_update_cursor (v2) |
| linux-libc-dev | CVE-2024-49909 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL check for function pointer in dcn32_set_output_transfer_func |
| linux-libc-dev | CVE-2024-49910 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL check for function pointer in dcn401_set_output_transfer_func |
| linux-libc-dev | CVE-2024-49911 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL check for function pointer in dcn20_set_output_transfer_func |
| linux-libc-dev | CVE-2024-49912 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Handle null 'stream_status' in 'planes_changed_for_existing_stream' |
| linux-libc-dev | CVE-2024-49914 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add null check for pipe_ctx-&gt;plane_state in dcn20_program_pipe |
| linux-libc-dev | CVE-2024-49915 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL check for clk_mgr in dcn32_init_hw |
| linux-libc-dev | CVE-2024-49916 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL check for clk_mgr and clk_mgr-&gt;funcs in dcn401_init_hw |
| linux-libc-dev | CVE-2024-49917 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add NULL check for clk_mgr and clk_mgr-&gt;funcs in dcn30_init_hw |
| linux-libc-dev | CVE-2024-49918 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add null check for head_pipe in dcn32_acquire_idle_pipe_for_head_pipe_in_layer |
| linux-libc-dev | CVE-2024-49919 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add null check for head_pipe in dcn201_acquire_free_pipe_for_layer |
| linux-libc-dev | CVE-2024-49920 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check null pointers before multiple uses |
| linux-libc-dev | CVE-2024-49921 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check null pointers before used |
| linux-libc-dev | CVE-2024-49922 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check null pointers before using them |
| linux-libc-dev | CVE-2024-49923 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Pass non-null to dcn20_validate_apply_pipe_split_flags |
| linux-libc-dev | CVE-2024-49926 | MEDIUM | 5.15.0-161.171 |  | kernel: rcu-tasks: Fix access non-existent percpu rtpcp variable in rcu_tasks_need_gpcb() |
| linux-libc-dev | CVE-2024-49928 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: avoid reading out of bounds when loading TX power FW elements |
| linux-libc-dev | CVE-2024-49929 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: mvm: avoid NULL pointer dereference |
| linux-libc-dev | CVE-2024-49931 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: fix array out-of-bound access in SoC stats |
| linux-libc-dev | CVE-2024-49932 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: don&#39;t readahead the relocation inode on RST |
| linux-libc-dev | CVE-2024-49939 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: avoid to add interface to list twice when SER |
| linux-libc-dev | CVE-2024-49940 | MEDIUM | 5.15.0-161.171 |  | kernel: l2tp: prevent possible tunnel refcount underflow |
| linux-libc-dev | CVE-2024-49945 | MEDIUM | 5.15.0-161.171 |  | kernel: net/ncsi: Disable the ncsi work before freeing the associated structure |
| linux-libc-dev | CVE-2024-49961 | MEDIUM | 5.15.0-161.171 |  | kernel: media: i2c: ar0521: Use cansleep version of gpiod_set_value() |
| linux-libc-dev | CVE-2024-49970 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Implement bounds check for stream encoder creation in DCN401 |
| linux-libc-dev | CVE-2024-49978 | MEDIUM | 5.15.0-161.171 |  | kernel: gso: fix udp gso fraglist segmentation after pull from frag_list |
| linux-libc-dev | CVE-2024-49987 | MEDIUM | 5.15.0-161.171 |  | kernel: bpftool: Fix undefined behavior in qsort(NULL, 0, ...) |
| linux-libc-dev | CVE-2024-49988 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: add refcnt to ksmbd_conn struct |
| linux-libc-dev | CVE-2024-49990 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe/hdcp: Check GSC structure validity |
| linux-libc-dev | CVE-2024-49991 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: amdkfd_free_gtt_mem clear the correct pointer |
| linux-libc-dev | CVE-2024-49992 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/stm: Avoid use-after-free issues with crtc and plane |
| linux-libc-dev | CVE-2024-49994 | MEDIUM | 5.15.0-161.171 |  | kernel: block: fix integer overflow in BLKSECDISCARD |
| linux-libc-dev | CVE-2024-50004 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: update DML2 policy EnhancedPrefetchScheduleAccelerationFinal DCN35 |
| linux-libc-dev | CVE-2024-50009 | MEDIUM | 5.15.0-161.171 |  | kernel: cpufreq: amd-pstate: add check for cpufreq_cpu_get&#39;s return value |
| linux-libc-dev | CVE-2024-50012 | MEDIUM | 5.15.0-161.171 |  | kernel: cpufreq: Avoid a bad reference count on CPU node |
| linux-libc-dev | CVE-2024-50014 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: fix access to uninitialised lock in fc replay path |
| linux-libc-dev | CVE-2024-50017 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/mm/ident_map: Use gbpages only where full GB page should be mapped. |
| linux-libc-dev | CVE-2024-50028 | MEDIUM | 5.15.0-161.171 |  | kernel: thermal: core: Reference count the zone in thermal_zone_get_by_id() |
| linux-libc-dev | CVE-2024-50034 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: fix lacks of icsk_syn_mss with IPPROTO_SMC |
| linux-libc-dev | CVE-2024-50048 | MEDIUM | 5.15.0-161.171 |  | kernel: fbcon: Fix a NULL pointer dereference issue in fbcon_putcs |
| linux-libc-dev | CVE-2024-50056 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: uvc: Fix ERR_PTR dereference in uvc_v4l2.c |
| linux-libc-dev | CVE-2024-50057 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: typec: tipd: Free IRQ only if it was requested before |
| linux-libc-dev | CVE-2024-50060 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring: check if we need to reschedule during overflow flush |
| linux-libc-dev | CVE-2024-50063 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Prevent tail call between progs attached to different hooks |
| linux-libc-dev | CVE-2024-50098 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: core: Set SDEV_OFFLINE when UFS is shut down |
| linux-libc-dev | CVE-2024-50106 | MEDIUM | 5.15.0-161.171 |  | kernel: nfsd: fix race between laundromat and free_stateid |
| linux-libc-dev | CVE-2024-50112 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/lam: Disable ADDRESS_MASKING in most cases |
| linux-libc-dev | CVE-2024-50135 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme-pci: fix race condition between reset and nvme_dev_disable() |
| linux-libc-dev | CVE-2024-50138 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Use raw_spinlock_t in ringbuf |
| linux-libc-dev | CVE-2024-50146 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Don't call cleanup on profile rollback failure |
| linux-libc-dev | CVE-2024-50164 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix overloading of MEM_UNINIT's meaning |
| linux-libc-dev | CVE-2024-50166 | MEDIUM | 5.15.0-161.171 |  | kernel: fsl/fman: Fix refcount handling of fman-related devices |
| linux-libc-dev | CVE-2024-50187 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vc4: Stop the active perfmon before being destroyed |
| linux-libc-dev | CVE-2024-50211 | MEDIUM | 5.15.0-161.171 |  | kernel: udf: refactor inode_bmap() to handle error |
| linux-libc-dev | CVE-2024-50246 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/ntfs3: Add rough attr alloc_size check |
| linux-libc-dev | CVE-2024-50271 | MEDIUM | 5.15.0-161.171 |  | kernel: signal: restore the override_rlimit logic |
| linux-libc-dev | CVE-2024-50284 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: Fix the missing xa_store error check |
| linux-libc-dev | CVE-2024-50285 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: check outstanding simultaneous SMB operations |
| linux-libc-dev | CVE-2024-50286 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix slab-use-after-free in ksmbd_smb2_session_create |
| linux-libc-dev | CVE-2024-50289 | MEDIUM | 5.15.0-161.171 |  | kernel: media: av7110: fix a spectre vulnerability |
| linux-libc-dev | CVE-2024-50298 | MEDIUM | 5.15.0-161.171 |  | kernel: net: enetc: allocate vf_state during PF probes |
| linux-libc-dev | CVE-2024-52559 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm/gem: prevent integer overflow in msm_ioctl_gem_submit() |
| linux-libc-dev | CVE-2024-52560 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/ntfs3: Mark inode as bad as soon as error detected in mi_enum_attr() |
| linux-libc-dev | CVE-2024-53050 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/i915/hdcp: Add encoder check in hdcp2_get_capability |
| linux-libc-dev | CVE-2024-53056 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/mediatek: Fix potential NULL dereference in mtk_crtc_destroy() |
| linux-libc-dev | CVE-2024-53079 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/thp: fix deferred split unqueue naming and locking |
| linux-libc-dev | CVE-2024-53091 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Add sk_is_inet and IS_ICSK check in tls_sw_has_ctx_tx/rx |
| linux-libc-dev | CVE-2024-53095 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: Fix use-after-free of network namespace. |
| linux-libc-dev | CVE-2024-53098 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe/ufence: Prefetch ufence addr to catch bogus address |
| linux-libc-dev | CVE-2024-53114 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/CPU/AMD: Clear virtualized VMLOAD/VMSAVE on Zen4 client |
| linux-libc-dev | CVE-2024-53133 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Handle dml allocation failure to avoid crash |
| linux-libc-dev | CVE-2024-53147 | MEDIUM | 5.15.0-161.171 |  | kernel: exfat: fix out-of-bounds access of directory entries |
| linux-libc-dev | CVE-2024-53175 | MEDIUM | 5.15.0-161.171 |  | kernel: ipc: fix memleak if msg_init_ns failed in create_ipc_ns |
| linux-libc-dev | CVE-2024-53176 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: During unmount, ensure all cached dir instances drop their dentry |
| linux-libc-dev | CVE-2024-53177 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: prevent use-after-free due to open_cached_dir error paths |
| linux-libc-dev | CVE-2024-53178 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: Don't leak cfid when reconnect races with open_cached_dir |
| linux-libc-dev | CVE-2024-53187 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring: check for overflows in io_pin_pages |
| linux-libc-dev | CVE-2024-53190 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtlwifi: Drastically reduce the attempts to read efuse in case of failures |
| linux-libc-dev | CVE-2024-53195 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: arm64: Get rid of userspace_irqchip_in_use |
| linux-libc-dev | CVE-2024-53196 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: arm64: Don't retire aborted MMIO instruction |
| linux-libc-dev | CVE-2024-53210 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/iucv: MSG_PEEK causes memory leak in iucv_sock_destruct() |
| linux-libc-dev | CVE-2024-53216 | MEDIUM | 5.15.0-161.171 |  | kernel: nfsd: release svc_expkey/svc_export with rcu_work |
| linux-libc-dev | CVE-2024-53219 | MEDIUM | 5.15.0-161.171 |  | kernel: virtiofs: use pages instead of pointer for kernel direct IO |
| linux-libc-dev | CVE-2024-53220 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to account dirty data in __get_secs_required() |
| linux-libc-dev | CVE-2024-53221 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix null-ptr-deref in f2fs_submit_page_bio() |
| linux-libc-dev | CVE-2024-53224 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/mlx5: Move events notifier registration to be after device registration |
| linux-libc-dev | CVE-2024-53234 | MEDIUM | 5.15.0-161.171 |  | kernel: erofs: handle NONHEAD !delta[1] lclusters gracefully |
| linux-libc-dev | CVE-2024-53687 | MEDIUM | 5.15.0-161.171 |  | kernel: riscv: Fix IPIs usage in kfence_protect_page() |
| linux-libc-dev | CVE-2024-54456 | MEDIUM | 5.15.0-161.171 |  | kernel: NFS: Fix potential buffer overflowin nfs_sysfs_link_rpc_client() |
| linux-libc-dev | CVE-2024-54683 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: IDLETIMER: Fix for possible ABBA deadlock |
| linux-libc-dev | CVE-2024-56368 | MEDIUM | 5.15.0-161.171 |  | kernel: ring-buffer: Fix overflow in __rb_map_vma |
| linux-libc-dev | CVE-2024-56538 | MEDIUM | 5.15.0-161.171 |  | kernel: drm: zynqmp_kms: Unplug DRM device before removal |
| linux-libc-dev | CVE-2024-56544 | MEDIUM | 5.15.0-161.171 |  | kernel: udmabuf: change folios array from kmalloc to kvmalloc |
| linux-libc-dev | CVE-2024-56557 | MEDIUM | 5.15.0-161.171 |  | kernel: iio: adc: ad7923: Fix buffer overflow for tx_buf and ring_xfer |
| linux-libc-dev | CVE-2024-56565 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to drop all discards after creating snapshot on lvm device |
| linux-libc-dev | CVE-2024-56566 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/slub: Avoid list corruption when removing a slab from the full list |
| linux-libc-dev | CVE-2024-56583 | MEDIUM | 5.15.0-161.171 |  | kernel: sched/deadline: Fix warning in migrate_enable for boosted tasks |
| linux-libc-dev | CVE-2024-56584 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring/tctx: work around xa_store() allocation error issue |
| linux-libc-dev | CVE-2024-56588 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: hisi_sas: Create all dump files during debugfs initialization |
| linux-libc-dev | CVE-2024-56591 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: hci_conn: Use disable_delayed_work_sync |
| linux-libc-dev | CVE-2024-56592 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Call free_htab_elem() after htab_unlock_bucket() |
| linux-libc-dev | CVE-2024-56604 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: RFCOMM: avoid leaving dangling sk pointer in rfcomm_sock_alloc() |
| linux-libc-dev | CVE-2024-56607 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: fix atomic calls in ath12k_mac_op_set_bitrate_mask() |
| linux-libc-dev | CVE-2024-56609 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw88: use ieee80211_purge_tx_queue() to purge TX skb |
| linux-libc-dev | CVE-2024-56611 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/mempolicy: fix migrate_to_node() assuming there is at least one VMA in a MM |
| linux-libc-dev | CVE-2024-56639 | MEDIUM | 5.15.0-161.171 |  | kernel: net: hsr: must allocate more bytes for RedBox support |
| linux-libc-dev | CVE-2024-56641 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: initialize close_work early to avoid warning |
| linux-libc-dev | CVE-2024-56647 | MEDIUM | 5.15.0-161.171 |  | kernel: net: Fix icmp host relookup triggering ip_rt_bug |
| linux-libc-dev | CVE-2024-56657 | MEDIUM | 5.15.0-161.171 |  | kernel: ALSA: control: Avoid WARN() for symlink errors |
| linux-libc-dev | CVE-2024-56660 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: DR, prevent potential error pointer dereference |
| linux-libc-dev | CVE-2024-56665 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf,perf: Fix invalid prog_array access in perf_event_detach_bpf_prog |
| linux-libc-dev | CVE-2024-56671 | MEDIUM | 5.15.0-161.171 |  | kernel: gpio: graniterapids: Fix vGPIO driver crash |
| linux-libc-dev | CVE-2024-56674 | MEDIUM | 5.15.0-161.171 |  | kernel: virtio_net: correct netdev_tx_reset_queue() invocation point |
| linux-libc-dev | CVE-2024-56677 | MEDIUM | 5.15.0-161.171 |  | kernel: powerpc/fadump: Move fadump_cma_init to setup_arch() after initmem_init() |
| linux-libc-dev | CVE-2024-56692 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to do sanity check on node blkaddr in truncate_node() |
| linux-libc-dev | CVE-2024-56703 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv6: Fix soft lockups in fib6_select_path under high next hop churn |
| linux-libc-dev | CVE-2024-56707 | MEDIUM | 5.15.0-161.171 |  | kernel: octeontx2-pf: handle otx2_mbox_get_rsp errors in otx2_dmac_flt.c |
| linux-libc-dev | CVE-2024-56709 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring: check if iowq is killed before queuing |
| linux-libc-dev | CVE-2024-56712 | MEDIUM | 5.15.0-161.171 |  | kernel: udmabuf: fix memory leak on last export_udmabuf() error path |
| linux-libc-dev | CVE-2024-56717 | MEDIUM | 5.15.0-161.171 |  | kernel: net: mscc: ocelot: fix incorrect IFH SRC_PORT field in ocelot_ifh_set_basic() |
| linux-libc-dev | CVE-2024-56718 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: protect link down work from execute after lgr freed |
| linux-libc-dev | CVE-2024-56719 | MEDIUM | 5.15.0-161.171 |  | kernel: net: stmmac: fix TSO DMA API usage causing oops |
| linux-libc-dev | CVE-2024-56722 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/hns: Fix cpu stuck caused by printings during reset |
| linux-libc-dev | CVE-2024-56727 | MEDIUM | 5.15.0-161.171 |  | kernel: octeontx2-pf: handle otx2_mbox_get_rsp errors in otx2_flows.c |
| linux-libc-dev | CVE-2024-56744 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to avoid potential deadlock in f2fs_record_stop_reason() |
| linux-libc-dev | CVE-2024-56757 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: btusb: mediatek: add intf release flow when usb disconnect |
| linux-libc-dev | CVE-2024-56775 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix handling of plane refcount |
| linux-libc-dev | CVE-2024-56782 | MEDIUM | 5.15.0-161.171 |  | kernel: ACPI: x86: Add adev NULL check to acpi_quirk_skip_serdev_enumeration() |
| linux-libc-dev | CVE-2024-56788 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ethernet: oa_tc6: fix tx skb race condition between reference pointers |
| linux-libc-dev | CVE-2024-57795 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/rxe: Remove the direct link to net_device |
| linux-libc-dev | CVE-2024-57804 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Fix corrupt config pages PHY state is switched in sysfs |
| linux-libc-dev | CVE-2024-57809 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI: imx6: Fix suspend/resume support on i.MX6QDL |
| linux-libc-dev | CVE-2024-57843 | MEDIUM | 5.15.0-161.171 |  | kernel: virtio-net: fix overflow inside virtnet_rq_alloc |
| linux-libc-dev | CVE-2024-57852 | MEDIUM | 5.15.0-161.171 |  | kernel: firmware: qcom: scm: smc: Handle missing SCM device |
| linux-libc-dev | CVE-2024-57857 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/siw: Remove direct link to net_device |
| linux-libc-dev | CVE-2024-57872 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: pltfrm: Dellocate HBA during ufshcd_pltfrm_remove() |
| linux-libc-dev | CVE-2024-57875 | MEDIUM | 5.15.0-161.171 |  | kernel: block: RCU protect disk->conv_zones_bitmap |
| linux-libc-dev | CVE-2024-57876 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/dp_mst: Fix resetting msg rx state after topology removal |
| linux-libc-dev | CVE-2024-57887 | MEDIUM | 5.15.0-161.171 |  | kernel: drm: adv7511: Fix use-after-free in adv7533_attach_dsi() |
| linux-libc-dev | CVE-2024-57888 | MEDIUM | 5.15.0-161.171 |  | kernel: workqueue: Do not warn when cancelling WQ_MEM_RECLAIM work from !WQ_MEM_RECLAIM worker |
| linux-libc-dev | CVE-2024-57893 | MEDIUM | 5.15.0-161.171 |  | kernel: ALSA: seq: oss: Fix races at processing SysEx messages |
| linux-libc-dev | CVE-2024-57895 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: set ATTR_CTIME flags when setting mtime |
| linux-libc-dev | CVE-2024-57898 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: cfg80211: clear link ID from bitmap during link delete after clean up |
| linux-libc-dev | CVE-2024-57899 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211: fix mbss changed flags corruption on 32 bit systems |
| linux-libc-dev | CVE-2024-57924 | MEDIUM | 5.15.0-161.171 |  | kernel: fs: relax assertions on failure to encode file handles |
| linux-libc-dev | CVE-2024-57945 | MEDIUM | 5.15.0-161.171 |  | kernel: riscv: mm: Fix the out of bound issue of vmemmap address |
| linux-libc-dev | CVE-2024-57950 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Initialize denominator defaults to 1 |
| linux-libc-dev | CVE-2024-57952 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "libfs: fix infinite directory reads for offset dir" |
| linux-libc-dev | CVE-2024-57974 | MEDIUM | 5.15.0-161.171 |  | kernel: udp: Deal with race between UDP socket address change and rehash |
| linux-libc-dev | CVE-2024-57975 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: do proper folio cleanup when run_delalloc_nocow() failed |
| linux-libc-dev | CVE-2024-57976 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: do proper folio cleanup when cow_file_range() failed |
| linux-libc-dev | CVE-2024-57982 | MEDIUM | 5.15.0-161.171 |  | kernel: xfrm: state: fix out-of-bounds read during lookup |
| linux-libc-dev | CVE-2024-57993 | MEDIUM | 5.15.0-161.171 |  | kernel: HID: hid-thrustmaster: Fix warning in thrustmaster_probe by adding endpoint check |
| linux-libc-dev | CVE-2024-57999 | MEDIUM | 5.15.0-161.171 |  | kernel: powerpc/pseries/iommu: IOMMU incorrectly marks MMIO range in DDW |
| linux-libc-dev | CVE-2024-58011 | MEDIUM | 5.15.0-161.171 |  | kernel: platform/x86: int3472: Check for adev == NULL |
| linux-libc-dev | CVE-2024-58012 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: SOF: Intel: hda-dai: Ensure DAI widget is valid during params |
| linux-libc-dev | CVE-2024-58013 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: MGMT: Fix slab-use-after-free Read in mgmt_remove_adv_monitor_sync |
| linux-libc-dev | CVE-2024-58015 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Fix for out-of bound access error |
| linux-libc-dev | CVE-2024-58018 | MEDIUM | 5.15.0-161.171 |  | kernel: nvkm: correctly calculate the available space of the GSP cmdq buffer |
| linux-libc-dev | CVE-2024-58019 | MEDIUM | 5.15.0-161.171 |  | kernel: nvkm/gsp: correctly advance the read pointer of GSP message queue |
| linux-libc-dev | CVE-2024-58053 | MEDIUM | 5.15.0-161.171 |  | kernel: rxrpc: Fix handling of received connection abort |
| linux-libc-dev | CVE-2024-58054 | MEDIUM | 5.15.0-161.171 |  | kernel: staging: media: max96712: fix kernel oops when removing module |
| linux-libc-dev | CVE-2024-58077 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: soc-pcm: don't use soc_pcm_ret() on .prepare callback |
| linux-libc-dev | CVE-2024-58089 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix double accounting race when btrfs_run_delalloc_range() failed |
| linux-libc-dev | CVE-2024-58094 | MEDIUM | 5.15.0-161.171 |  | kernel: jfs: add check read-only before truncation in jfs_truncate_nolock() |
| linux-libc-dev | CVE-2024-58095 | MEDIUM | 5.15.0-161.171 |  | kernel: jfs: add check read-only before txBeginAnon() call |
| linux-libc-dev | CVE-2024-58096 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath11k: add srng->lock for ath11k_hal_srng_* in monitor mode |
| linux-libc-dev | CVE-2024-58097 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath11k: fix RCU stall while reaping monitor destination ring |
| linux-libc-dev | CVE-2024-58098 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: track changes_pkt_data property for global functions |
| linux-libc-dev | CVE-2024-58100 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: check changes_pkt_data property for extension programs |
| linux-libc-dev | CVE-2024-58238 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: btnxpuart: Resolve TX timeout error in power save stress test |
| linux-libc-dev | CVE-2024-58241 | MEDIUM | 5.15.0-161.171 |  | kernel: Kernel: Bluetooth HCI local DoS |
| linux-libc-dev | CVE-2025-21629 | MEDIUM | 5.15.0-161.171 |  | kernel: net: reenable NETIF_F_IPV6_CSUM offload for BIG TCP packets |
| linux-libc-dev | CVE-2025-21634 | MEDIUM | 5.15.0-161.171 |  | kernel: cgroup/cpuset: remove kernfs active break |
| linux-libc-dev | CVE-2025-21635 | MEDIUM | 5.15.0-161.171 |  | kernel: rds: sysctl: rds_tcp_{rcv,snd}buf: avoid using current->nsproxy |
| linux-libc-dev | CVE-2025-21649 | MEDIUM | 5.15.0-161.171 |  | kernel: net: hns3: fix kernel crash when 1588 is sent on HIP08 devices |
| linux-libc-dev | CVE-2025-21651 | MEDIUM | 5.15.0-161.171 |  | kernel: net: hns3: don't auto enable misc vector |
| linux-libc-dev | CVE-2025-21656 | MEDIUM | 5.15.0-161.171 |  | kernel: hwmon: (drivetemp) Fix driver producing garbage data when SCSI errors occur |
| linux-libc-dev | CVE-2025-21658 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: avoid NULL pointer dereference if no valid extent tree |
| linux-libc-dev | CVE-2025-21667 | MEDIUM | 5.15.0-161.171 |  | kernel: iomap: avoid avoid truncating 64-bit offset to 32 bits |
| linux-libc-dev | CVE-2025-21672 | MEDIUM | 5.15.0-161.171 |  | kernel: afs: Fix merge preference rule failure condition |
| linux-libc-dev | CVE-2025-21673 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix double free of TCP_Server_Info::hostname |
| linux-libc-dev | CVE-2025-21682 | MEDIUM | 5.15.0-161.171 |  | kernel: eth: bnxt: always recalculate features after XDP clearing, fix null-deref |
| linux-libc-dev | CVE-2025-21693 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: zswap: properly synchronize freeing resources during CPU hotunplug |
| linux-libc-dev | CVE-2025-21696 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: clear uffd-wp PTE/PMD state on mremap() |
| linux-libc-dev | CVE-2025-21712 | MEDIUM | 5.15.0-161.171 |  | kernel: md/md-bitmap: Synchronize bitmap_get_stats() with bitmap lifetime |
| linux-libc-dev | CVE-2025-21723 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Fix possible crash when setting up bsg fails |
| linux-libc-dev | CVE-2025-21730 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: rtw89: avoid to init mgnt_entry list twice when WoWLAN failed |
| linux-libc-dev | CVE-2025-21732 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/mlx5: Fix a race for an ODP MR which leads to CQE with error |
| linux-libc-dev | CVE-2025-21734 | MEDIUM | 5.15.0-161.171 |  | kernel: misc: fastrpc: Fix copy buffer page size |
| linux-libc-dev | CVE-2025-21738 | MEDIUM | 5.15.0-161.171 |  | kernel: ata: libata-sff: Ensure that we cannot write outside the allocated buffer |
| linux-libc-dev | CVE-2025-21739 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: ufs: core: Fix use-after free in init error and remove paths |
| linux-libc-dev | CVE-2025-21750 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: brcmfmac: Check the return value of of_property_read_string_index() |
| linux-libc-dev | CVE-2025-21751 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: HWS, change error flow on matcher disconnect |
| linux-libc-dev | CVE-2025-21752 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: don't use btrfs_set_item_key_safe on RAID stripe-extents |
| linux-libc-dev | CVE-2025-21759 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv6: mcast: extend RCU protection in igmp6_send() |
| linux-libc-dev | CVE-2025-21768 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ipv6: fix dst ref loops in rpl, seg6 and ioam6 lwtunnels |
| linux-libc-dev | CVE-2025-21780 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: avoid buffer overflow attach in smu_sys_set_pp_table() |
| linux-libc-dev | CVE-2025-21786 | MEDIUM | 5.15.0-161.171 |  | kernel: workqueue: Put the pwq after detaching the rescuer from the pool |
| linux-libc-dev | CVE-2025-21792 | MEDIUM | 5.15.0-161.171 |  | kernel: ax25: Fix refcount leak caused by setting SO_BINDTODEVICE sockopt |
| linux-libc-dev | CVE-2025-21801 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ravb: Fix missing rtnl lock in suspend/resume path |
| linux-libc-dev | CVE-2025-21812 | MEDIUM | 5.15.0-161.171 |  | kernel: ax25: rcu protect dev->ax25_ptr |
| linux-libc-dev | CVE-2025-21816 | MEDIUM | 5.15.0-161.171 |  | kernel: hrtimers: Force migrate away hrtimers queued after CPUHP_AP_HRTIMERS_DYING |
| linux-libc-dev | CVE-2025-21817 | MEDIUM | 5.15.0-161.171 |  | kernel: block: mark GFP_NOIO around sysfs ->store() |
| linux-libc-dev | CVE-2025-21819 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "drm/amd/display: Use HW lock mgr for PSR1" |
| linux-libc-dev | CVE-2025-21821 | MEDIUM | 5.15.0-161.171 |  | kernel: fbdev: omap: use threaded IRQ for LCD DMA |
| linux-libc-dev | CVE-2025-21825 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Cancel the running bpf_timer through kworker for PREEMPT_RT |
| linux-libc-dev | CVE-2025-21831 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI: Avoid putting some root ports into D3 on TUXEDO Sirius Gen1 |
| linux-libc-dev | CVE-2025-21832 | MEDIUM | 5.15.0-161.171 |  | kernel: block: don't revert iter for -EIOCBQUEUED |
| linux-libc-dev | CVE-2025-21833 | MEDIUM | 5.15.0-161.171 |  | kernel: iommu/vt-d: Avoid use of NULL after WARN_ON_ONCE |
| linux-libc-dev | CVE-2025-21838 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: core: flush gadget workqueue after device removal |
| linux-libc-dev | CVE-2025-21861 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/migrate_device: don't add folio to be freed to LRU in migrate_device_finalize() |
| linux-libc-dev | CVE-2025-21863 | MEDIUM | 5.15.0-161.171 |  | kernel: io_uring: prevent opcode speculation |
| linux-libc-dev | CVE-2025-21872 | MEDIUM | 5.15.0-161.171 |  | kernel: efi: Don't map the entire mokvar table to determine its size |
| linux-libc-dev | CVE-2025-21881 | MEDIUM | 5.15.0-161.171 |  | kernel: uprobes: Reject the shared zeropage in uprobe_write_opcode() |
| linux-libc-dev | CVE-2025-21885 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/bnxt_re: Fix the page details for the srq created by kernel consumers |
| linux-libc-dev | CVE-2025-21891 | MEDIUM | 5.15.0-161.171 |  | kernel: ipvlan: ensure network headers are in skb linear part |
| linux-libc-dev | CVE-2025-21894 | MEDIUM | 5.15.0-161.171 |  | kernel: net: enetc: VFs do not support HWTSTAMP_TX_ONESTEP_SYNC |
| linux-libc-dev | CVE-2025-21899 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing: Fix bad hist from corrupting named_triggers list |
| linux-libc-dev | CVE-2025-21908 | MEDIUM | 5.15.0-161.171 |  | kernel: NFS: fix nfs_release_folio() to not deadlock via kcompactd writeback |
| linux-libc-dev | CVE-2025-21915 | MEDIUM | 5.15.0-161.171 |  | kernel: cdx: Fix possible UAF error in driver_override_show() |
| linux-libc-dev | CVE-2025-21918 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: typec: ucsi: Fix NULL pointer access |
| linux-libc-dev | CVE-2025-21927 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme-tcp: fix potential memory corruption in nvme_tcp_recv_pdu() |
| linux-libc-dev | CVE-2025-21931 | MEDIUM | 5.15.0-161.171 |  | kernel: hwpoison, memory_hotplug: lock folio before unmap hwpoisoned folio |
| linux-libc-dev | CVE-2025-21944 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix bug on trap in smb2_lock |
| linux-libc-dev | CVE-2025-21945 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in smb2_lock |
| linux-libc-dev | CVE-2025-21946 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix out-of-bounds in parse_sec_desc() |
| linux-libc-dev | CVE-2025-21947 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix type confusion via race condition when using ipc_msg_send_request |
| linux-libc-dev | CVE-2025-21955 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: prevent connection release during oplock break notification |
| linux-libc-dev | CVE-2025-21967 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in ksmbd_free_work_struct |
| linux-libc-dev | CVE-2025-21969 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: L2CAP: Fix slab-use-after-free Read in l2cap_send_cmd |
| linux-libc-dev | CVE-2025-21972 | MEDIUM | 5.15.0-161.171 |  | kernel: net: mctp: unshare packets when reassembling |
| linux-libc-dev | CVE-2025-21976 | MEDIUM | 5.15.0-161.171 |  | kernel: fbdev: hyperv_fb: Allow graceful removal of framebuffer |
| linux-libc-dev | CVE-2025-21985 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix out-of-bound accesses |
| linux-libc-dev | CVE-2025-21986 | MEDIUM | 5.15.0-161.171 |  | kernel: net: switchdev: Convert blocking notification chain to a raw one |
| linux-libc-dev | CVE-2025-22019 | MEDIUM | 5.15.0-161.171 |  | kernel: bcachefs: bch2_ioctl_subvolume_destroy() fixes |
| linux-libc-dev | CVE-2025-22022 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: xhci: Apply the link chain quirk on NEC isoc endpoints |
| linux-libc-dev | CVE-2025-22026 | MEDIUM | 5.15.0-161.171 |  | kernel: nfsd: don't ignore the return code of svc_proc_register() |
| linux-libc-dev | CVE-2025-22028 | MEDIUM | 5.15.0-161.171 |  | kernel: media: vimc: skip .s_stream() for stopped entities |
| linux-libc-dev | CVE-2025-22037 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix null pointer dereference in alloc_preauth_hash() |
| linux-libc-dev | CVE-2025-22038 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: validate zero num_subauth before sub_auth is accessed |
| linux-libc-dev | CVE-2025-22039 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix overflow in dacloffset bounds check |
| linux-libc-dev | CVE-2025-22040 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix session use-after-free in multichannel connection |
| linux-libc-dev | CVE-2025-22041 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in ksmbd_sessions_deregister() |
| linux-libc-dev | CVE-2025-22042 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: add bounds check for create lease context |
| linux-libc-dev | CVE-2025-22043 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: add bounds check for durable handle context |
| linux-libc-dev | CVE-2025-22053 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ibmveth: make veth_pool_store stop hanging |
| linux-libc-dev | CVE-2025-22057 | MEDIUM | 5.15.0-161.171 |  | kernel: net: decrease cached dst counters in dst_release |
| linux-libc-dev | CVE-2025-22058 | MEDIUM | 5.15.0-161.171 |  | kernel: udp: Fix memory accounting leak. |
| linux-libc-dev | CVE-2025-22072 | MEDIUM | 5.15.0-161.171 |  | kernel: spufs: fix gang directory lifetimes |
| linux-libc-dev | CVE-2025-22083 | MEDIUM | 5.15.0-161.171 |  | kernel: vhost-scsi: Fix handling of multiple calls to vhost_scsi_set_endpoint |
| linux-libc-dev | CVE-2025-22090 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/mm/pat: Fix VM_PAT handling when fork() fails in copy_page_range() |
| linux-libc-dev | CVE-2025-22103 | MEDIUM | 5.15.0-161.171 |  | kernel: net: fix NULL pointer dereference in l3mdev_l3_rcv |
| linux-libc-dev | CVE-2025-22104 | MEDIUM | 5.15.0-161.171 |  | kernel: ibmvnic: Use kernel helpers for hex dumps |
| linux-libc-dev | CVE-2025-22105 | MEDIUM | 5.15.0-161.171 |  | kernel: bonding: check xdp prog when set bond mode |
| linux-libc-dev | CVE-2025-22107 | MEDIUM | 5.15.0-161.171 |  | kernel: net: dsa: sja1105: fix kasan out-of-bounds warning in sja1105_table_delete_entry() |
| linux-libc-dev | CVE-2025-22109 | MEDIUM | 5.15.0-161.171 |  | kernel: ax25: Remove broken autobind |
| linux-libc-dev | CVE-2025-22111 | MEDIUM | 5.15.0-161.171 |  | kernel: net: Remove RTNL dance for SIOCBRADDIF and SIOCBRDELIF. |
| linux-libc-dev | CVE-2025-22113 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: avoid journaling sb update on error if journal is destroying |
| linux-libc-dev | CVE-2025-22121 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: fix out-of-bound read in ext4_xattr_inode_dec_ref_all() |
| linux-libc-dev | CVE-2025-22124 | MEDIUM | 5.15.0-161.171 |  | kernel: md/md-bitmap: fix wrong bitmap_limit for clustermd when write sb |
| linux-libc-dev | CVE-2025-22125 | MEDIUM | 5.15.0-161.171 |  | kernel: md/raid1,raid10: don't ignore IO flags |
| linux-libc-dev | CVE-2025-22127 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix potential deadloop in prepare_compress_overwrite() |
| linux-libc-dev | CVE-2025-23130 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to avoid panic once fallocation fails for pinfile |
| linux-libc-dev | CVE-2025-23131 | MEDIUM | 5.15.0-161.171 |  | kernel: dlm: prevent NPD when writing a positive value to event_done |
| linux-libc-dev | CVE-2025-23132 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: quota: fix to avoid warning in dquot_writeback_dquots() |
| linux-libc-dev | CVE-2025-23133 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath11k: update channel list in reg notifier instead reg worker |
| linux-libc-dev | CVE-2025-23141 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: x86: Acquire SRCU in KVM_GET_MP_STATE to protect guest memory accesses |
| linux-libc-dev | CVE-2025-23143 | MEDIUM | 5.15.0-161.171 |  | kernel: net: Fix null-ptr-deref by sock_lock_init_class_and_name() and rmmod. |
| linux-libc-dev | CVE-2025-23155 | MEDIUM | 5.15.0-161.171 |  | kernel: net: stmmac: Fix accessing freed irq affinity_hint |
| linux-libc-dev | CVE-2025-23160 | MEDIUM | 5.15.0-161.171 |  | kernel: media: mediatek: vcodec: Fix a resource leak related to the scp device in FW initialization |
| linux-libc-dev | CVE-2025-23162 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe/vf: Don't try to trigger a full GT reset if VF |
| linux-libc-dev | CVE-2025-37743 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Avoid memory leak while enabling statistics |
| linux-libc-dev | CVE-2025-37744 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: fix memory leak in ath12k_pci_remove() |
| linux-libc-dev | CVE-2025-37745 | MEDIUM | 5.15.0-161.171 |  | kernel: PM: hibernate: Avoid deadlock in hibernate_compressor_param_set() |
| linux-libc-dev | CVE-2025-37746 | MEDIUM | 5.15.0-161.171 |  | kernel: perf/dwc_pcie: fix duplicate pci_dev devices |
| linux-libc-dev | CVE-2025-37747 | MEDIUM | 5.15.0-161.171 |  | kernel: perf: Fix hang while freeing sigtrap event |
| linux-libc-dev | CVE-2025-37775 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix the warning from __kernel_write_iter |
| linux-libc-dev | CVE-2025-37776 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in smb_break_all_levII_oplock() |
| linux-libc-dev | CVE-2025-37777 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in __smb2_lease_break_noti() |
| linux-libc-dev | CVE-2025-37778 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: Fix dangling pointer in krb_authenticate |
| linux-libc-dev | CVE-2025-37786 | MEDIUM | 5.15.0-161.171 |  | kernel: net: dsa: free routing table on probe failure |
| linux-libc-dev | CVE-2025-37806 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/ntfs3: Keep write operations atomic |
| linux-libc-dev | CVE-2025-37807 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix kmemleak warning for percpu hashmap |
| linux-libc-dev | CVE-2025-37820 | MEDIUM | 5.15.0-161.171 |  | kernel: xen-netfront: handle NULL returned by xdp_convert_buff_to_frame() |
| linux-libc-dev | CVE-2025-37822 | MEDIUM | 5.15.0-161.171 |  | kernel: riscv: uprobes: Add missing fence.i after building the XOL buffer |
| linux-libc-dev | CVE-2025-37833 | MEDIUM | 5.15.0-161.171 |  | kernel: net/niu: Niu requires MSIX ENTRY_DATA fields touch before entry reads |
| linux-libc-dev | CVE-2025-37834 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/vmscan: don't try to reclaim hwpoison folio |
| linux-libc-dev | CVE-2025-37842 | MEDIUM | 5.15.0-161.171 |  | kernel: spi: fsl-qspi: use devm function instead of driver remove |
| linux-libc-dev | CVE-2025-37849 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: arm64: Tear down vGIC on failed vCPU creation |
| linux-libc-dev | CVE-2025-37852 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: handle amdgpu_cgs_create_device() errors in amd_powerplay_create() |
| linux-libc-dev | CVE-2025-37853 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: debugfs hang_hws skip GPU with MES |
| linux-libc-dev | CVE-2025-37854 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Fix mode1 reset crash issue |
| linux-libc-dev | CVE-2025-37855 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Guard Possible Null Pointer Dereference |
| linux-libc-dev | CVE-2025-37856 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: harden block_group::bg_list against list_del() races |
| linux-libc-dev | CVE-2025-37861 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpi3mr: Synchronous access b/w reset and tm thread for reply queue |
| linux-libc-dev | CVE-2025-37870 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: prevent hang on link training fail |
| linux-libc-dev | CVE-2025-37876 | MEDIUM | 5.15.0-161.171 |  | kernel: netfs: Only create /proc/fs/netfs with CONFIG_PROC_FS |
| linux-libc-dev | CVE-2025-37877 | MEDIUM | 5.15.0-161.171 |  | kernel: iommu: Clear iommu-dma ops on cleanup |
| linux-libc-dev | CVE-2025-37878 | MEDIUM | 5.15.0-161.171 |  | kernel: perf/core: Fix WARN_ON(!ctx) in __free_event() for partial init |
| linux-libc-dev | CVE-2025-37879 | MEDIUM | 5.15.0-161.171 |  | kernel: 9p/net: fix improper handling of bogus negative read/write replies |
| linux-libc-dev | CVE-2025-37880 | MEDIUM | 5.15.0-161.171 |  | kernel: um: work around sched_yield not yielding in time-travel mode |
| linux-libc-dev | CVE-2025-37882 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: xhci: Fix isochronous Ring Underrun/Overrun event handling |
| linux-libc-dev | CVE-2025-37884 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix deadlock between rcu_tasks_trace and event_mutex. |
| linux-libc-dev | CVE-2025-37899 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in session logoff |
| linux-libc-dev | CVE-2025-37903 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Fix slab-use-after-free in hdcp |
| linux-libc-dev | CVE-2025-37907 | MEDIUM | 5.15.0-161.171 |  | kernel: accel/ivpu: Fix locking order in ivpu_job_submit |
| linux-libc-dev | CVE-2025-37920 | MEDIUM | 5.15.0-161.171 |  | kernel: xsk: Fix race condition in AF_XDP generic RX path |
| linux-libc-dev | CVE-2025-37924 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in kerberos authentication |
| linux-libc-dev | CVE-2025-37926 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix use-after-free in ksmbd_session_rpc_open |
| linux-libc-dev | CVE-2025-37928 | MEDIUM | 5.15.0-161.171 |  | kernel: dm-bufio: don't schedule in atomic context |
| linux-libc-dev | CVE-2025-37931 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: adjust subpage bit start based on sectorsize |
| linux-libc-dev | CVE-2025-37938 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing: Verify event formats that have "%*p.." |
| linux-libc-dev | CVE-2025-37942 | MEDIUM | 5.15.0-161.171 |  | kernel: HID: pidff: Make sure to fetch pool before checking SIMULTANEOUS_MAX |
| linux-libc-dev | CVE-2025-37943 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Fix invalid data access in ath12k_dp_rx_h_undecap_nwifi |
| linux-libc-dev | CVE-2025-37944 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Fix invalid entry fetch in ath12k_dp_mon_srng_process |
| linux-libc-dev | CVE-2025-37945 | MEDIUM | 5.15.0-161.171 |  | kernel: net: phy: allow MDIO bus PM ops to start/stop state machine for phylink-controlled PHY |
| linux-libc-dev | CVE-2025-37947 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: prevent out-of-bounds stream writes by validating *pos |
| linux-libc-dev | CVE-2025-37951 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/v3d: Add job to pending list if the reset was skipped |
| linux-libc-dev | CVE-2025-37952 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: Fix UAF in __close_file_table_ids |
| linux-libc-dev | CVE-2025-37954 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: Avoid race in open_cached_dir with lease breaks |
| linux-libc-dev | CVE-2025-37956 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: prevent rename with empty string |
| linux-libc-dev | CVE-2025-37957 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: SVM: Forcibly leave SMM mode on SHUTDOWN interception |
| linux-libc-dev | CVE-2025-37959 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Scrub packet on bpf_redirect_peer |
| linux-libc-dev | CVE-2025-37961 | MEDIUM | 5.15.0-161.171 |  | kernel: ipvs: fix uninit-value for saddr in do_output_route4 |
| linux-libc-dev | CVE-2025-37980 | MEDIUM | 5.15.0-161.171 |  | kernel: block: fix resource leak in blk_register_queue() error path |
| linux-libc-dev | CVE-2025-37984 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: ecdsa - Harden against integer overflows in DIV_ROUND_UP() |
| linux-libc-dev | CVE-2025-38006 | MEDIUM | 5.15.0-161.171 |  | kernel: net: mctp: Don't access ifa_index when missing |
| linux-libc-dev | CVE-2025-38011 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: csa unmap use uninterruptible lock |
| linux-libc-dev | CVE-2025-38014 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: idxd: Refactor remove call with idxd_cleanup() helper |
| linux-libc-dev | CVE-2025-38015 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: idxd: fix memory leak in error handling path of idxd_alloc |
| linux-libc-dev | CVE-2025-38020 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Disable MACsec offload for uplink representor profile |
| linux-libc-dev | CVE-2025-38022 | MEDIUM | 5.15.0-161.171 |  | kernel: RDMA/core: Fix "KASAN: slab-use-after-free Read in ib_register_device" problem |
| linux-libc-dev | CVE-2025-38029 | MEDIUM | 5.15.0-161.171 |  | kernel: kasan: avoid sleepable page allocation from atomic context |
| linux-libc-dev | CVE-2025-38033 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/Kconfig: make CFI_AUTO_DEFAULT depend on !RUST or Rust >= 1.88 |
| linux-libc-dev | CVE-2025-38036 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe/vf: Perform early GT MMIO initialization to read GMDID |
| linux-libc-dev | CVE-2025-38038 | MEDIUM | 5.15.0-161.171 |  | kernel: cpufreq: amd-pstate: Remove unnecessary driver_lock in set_boost |
| linux-libc-dev | CVE-2025-38039 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Avoid WARN_ON when configuring MQPRIO with HTB offload enabled |
| linux-libc-dev | CVE-2025-38040 | MEDIUM | 5.15.0-161.171 |  | kernel: serial: mctrl_gpio: split disable_ms into sync and no_sync APIs |
| linux-libc-dev | CVE-2025-38041 | MEDIUM | 5.15.0-161.171 |  | kernel: clk: sunxi-ng: h616: Reparent GPU clock during frequency changes |
| linux-libc-dev | CVE-2025-38042 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: ti: k3-udma-glue: Drop skip_fdq argument from k3_udma_glue_reset_rx_chn |
| linux-libc-dev | CVE-2025-38045 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: fix debug actions order |
| linux-libc-dev | CVE-2025-38047 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/fred: Fix system hang during S4 resume with FRED enabled |
| linux-libc-dev | CVE-2025-38057 | MEDIUM | 5.15.0-161.171 |  | kernel: espintcp: fix skb leaks |
| linux-libc-dev | CVE-2025-38059 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: avoid NULL pointer dereference if no valid csum tree |
| linux-libc-dev | CVE-2025-38060 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: copy_verifier_state() should copy 'loop_entry' field |
| linux-libc-dev | CVE-2025-38062 | MEDIUM | 5.15.0-161.171 |  | kernel: genirq/msi: Store the IOMMU IOVA directly in msi_desc instead of iommu_cookie |
| linux-libc-dev | CVE-2025-38063 | MEDIUM | 5.15.0-161.171 |  | kernel: dm: fix unconditional IO throttle caused by REQ_PREFLUSH |
| linux-libc-dev | CVE-2025-38064 | MEDIUM | 5.15.0-161.171 |  | kernel: virtio: break and reset virtio devices on device_shutdown() |
| linux-libc-dev | CVE-2025-38069 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI: endpoint: pci-epf-test: Fix double free that causes kernel to oops |
| linux-libc-dev | CVE-2025-38070 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: sma1307: Add NULL check in sma1307_setting_loaded() |
| linux-libc-dev | CVE-2025-38071 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/mm: Check return value from memblock_phys_alloc_range() |
| linux-libc-dev | CVE-2025-38073 | MEDIUM | 5.15.0-161.171 |  | kernel: block: fix race between set_blocksize and read paths |
| linux-libc-dev | CVE-2025-38080 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Increase block_sequence array size |
| linux-libc-dev | CVE-2025-38081 | MEDIUM | 5.15.0-161.171 |  | kernel: spi-rockchip: Fix register out of bounds access |
| linux-libc-dev | CVE-2025-38082 | MEDIUM | 5.15.0-161.171 |  | kernel: gpio: virtuser: fix potential out-of-bound write |
| linux-libc-dev | CVE-2025-38091 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: check stream id dml21 wrapper to get plane_id |
| linux-libc-dev | CVE-2025-38092 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: use list_first_entry_or_null for opinfo_get_list() |
| linux-libc-dev | CVE-2025-38096 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: iwlwifi: don't warn when if there is a FW error |
| linux-libc-dev | CVE-2025-38097 | MEDIUM | 5.15.0-161.171 |  | kernel: espintcp: remove encap socket caching to avoid reference leak |
| linux-libc-dev | CVE-2025-38098 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Don't treat wb connector as physical in create_validate_stream_for_sink |
| linux-libc-dev | CVE-2025-38099 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: Disable SCO support if READ_VOICE_SETTING is unsupported/broken |
| linux-libc-dev | CVE-2025-38105 | MEDIUM | 5.15.0-161.171 |  | kernel: ALSA: usb-audio: Kill timer properly at removal |
| linux-libc-dev | CVE-2025-38109 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5: Fix ECVF vports unload on shutdown flow |
| linux-libc-dev | CVE-2025-38117 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: MGMT: Protect mgmt_pending list with its own lock |
| linux-libc-dev | CVE-2025-38125 | MEDIUM | 5.15.0-161.171 |  | kernel: net: stmmac: make sure that ptp_rate is not 0 before configuring EST |
| linux-libc-dev | CVE-2025-38126 | MEDIUM | 5.15.0-161.171 |  | kernel: net: stmmac: make sure that ptp_rate is not 0 before configuring timestamping |
| linux-libc-dev | CVE-2025-38127 | MEDIUM | 5.15.0-161.171 |  | kernel: ice: fix Tx scheduler error handling in XDP callback |
| linux-libc-dev | CVE-2025-38129 | MEDIUM | 5.15.0-161.171 |  | kernel: page_pool: Fix use-after-free in page_pool_recycle_in_ring |
| linux-libc-dev | CVE-2025-38131 | MEDIUM | 5.15.0-161.171 |  | kernel: coresight: prevent deactivate active config while enabling the config |
| linux-libc-dev | CVE-2025-38140 | MEDIUM | 5.15.0-161.171 |  | kernel: dm: limit swapping tables for devices with zone write plugs |
| linux-libc-dev | CVE-2025-38162 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: nft_set_pipapo: prevent overflow in lookup table allocation |
| linux-libc-dev | CVE-2025-38166 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: fix ktls panic with sockmap |
| linux-libc-dev | CVE-2025-38168 | MEDIUM | 5.15.0-161.171 |  | kernel: perf: arm-ni: Unregister PMUs on probe failure |
| linux-libc-dev | CVE-2025-38189 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/v3d: Avoid NULL pointer dereference in `v3d_job_update_stats()` |
| linux-libc-dev | CVE-2025-38191 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix null pointer dereference in destroy_previous_session |
| linux-libc-dev | CVE-2025-38192 | MEDIUM | 5.15.0-161.171 |  | kernel: net: clear the dst when changing skb protocol |
| linux-libc-dev | CVE-2025-38198 | MEDIUM | 5.15.0-161.171 |  | kernel: fbcon: Make sure modelist not set on unregistered console |
| linux-libc-dev | CVE-2025-38199 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Fix memory leak due to multiple rx_stats allocation |
| linux-libc-dev | CVE-2025-38201 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: nft_set_pipapo: clamp maximum map bucket size to INT_MAX |
| linux-libc-dev | CVE-2025-38202 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Check rcu_read_lock_trace_held() in bpf_map_lookup_percpu_elem() |
| linux-libc-dev | CVE-2025-38205 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Avoid divide by zero by initializing dummy pitch to 1 |
| linux-libc-dev | CVE-2025-38207 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: fix uprobe pte be overwritten when expanding vma |
| linux-libc-dev | CVE-2025-38208 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: add NULL check in automount_fullpath |
| linux-libc-dev | CVE-2025-38215 | MEDIUM | 5.15.0-161.171 |  | kernel: fbdev: Fix do_register_framebuffer to prevent null-ptr-deref in fb_videomode_to_var |
| linux-libc-dev | CVE-2025-38225 | MEDIUM | 5.15.0-161.171 |  | kernel: media: imx-jpeg: Cleanup after an allocation error |
| linux-libc-dev | CVE-2025-38232 | MEDIUM | 5.15.0-161.171 |  | kernel: NFSD: fix race between nfsd registration and exports_proc |
| linux-libc-dev | CVE-2025-38234 | MEDIUM | 5.15.0-161.171 |  | kernel: sched/rt: Fix race in push_rt_task |
| linux-libc-dev | CVE-2025-38236 | MEDIUM | 5.15.0-161.171 |  | kernel: af_unix: Don't leave consecutive consumed OOB skbs. |
| linux-libc-dev | CVE-2025-38239 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: megaraid_sas: Fix invalid node index |
| linux-libc-dev | CVE-2025-38244 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix potential deadlock when reconnecting channels |
| linux-libc-dev | CVE-2025-38248 | MEDIUM | 5.15.0-161.171 |  | kernel: bridge: mcast: Fix use-after-free during router port configuration |
| linux-libc-dev | CVE-2025-38250 | MEDIUM | 5.15.0-161.171 |  | kernel: Bluetooth: hci_core: Fix use-after-free in vhci_flush() |
| linux-libc-dev | CVE-2025-38259 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: codecs: wcd9335: Fix missing free of regulator supplies |
| linux-libc-dev | CVE-2025-38261 | MEDIUM | 5.15.0-161.171 |  | kernel: riscv: save the SR_SUM status over switches |
| linux-libc-dev | CVE-2025-38264 | MEDIUM | 5.15.0-161.171 |  | kernel: nvme-tcp: sanitize request list handling |
| linux-libc-dev | CVE-2025-38269 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: exit after state insertion failure at btrfs_convert_extent_bit() |
| linux-libc-dev | CVE-2025-38272 | MEDIUM | 5.15.0-161.171 |  | kernel: net: dsa: b53: do not enable EEE on bcm63xx |
| linux-libc-dev | CVE-2025-38275 | MEDIUM | 5.15.0-161.171 |  | kernel: phy: qcom-qmp-usb: Fix an NULL vs IS_ERR() bug |
| linux-libc-dev | CVE-2025-38300 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: sun8i-ce-cipher - fix error handling in sun8i_ce_cipher_prepare() |
| linux-libc-dev | CVE-2025-38321 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: Log an error when close_all_cached_dirs fails |
| linux-libc-dev | CVE-2025-38329 | MEDIUM | 5.15.0-161.171 |  | kernel: firmware: cs_dsp: Fix OOB memory read access in KUnit test (wmfw info) |
| linux-libc-dev | CVE-2025-38330 | MEDIUM | 5.15.0-161.171 |  | kernel: firmware: cs_dsp: Fix OOB memory read access in KUnit test (ctl cache) |
| linux-libc-dev | CVE-2025-38331 | MEDIUM | 5.15.0-161.171 |  | kernel: net: ethernet: cortina: Use TOE/TSO on all TCP |
| linux-libc-dev | CVE-2025-38333 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to bail out in get_new_segment() |
| linux-libc-dev | CVE-2025-38334 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/sgx: Prevent attempts to reclaim poisoned pages |
| linux-libc-dev | CVE-2025-38340 | MEDIUM | 5.15.0-161.171 |  | kernel: firmware: cs_dsp: Fix OOB memory read access in KUnit test |
| linux-libc-dev | CVE-2025-38343 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mt76: mt7996: drop fragments with multicast or broadcast RA |
| linux-libc-dev | CVE-2025-38349 | MEDIUM | 5.15.0-161.171 |  | kernel: eventpoll: don't decrement ep refcount while still holding the ep mutex |
| linux-libc-dev | CVE-2025-38353 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe: Fix taking invalid lock on wedge |
| linux-libc-dev | CVE-2025-38359 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/mm: Fix in_atomic() handling in do_secure_storage_access() |
| linux-libc-dev | CVE-2025-38360 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Add more checks for DSC / HUBP ONO guarantees |
| linux-libc-dev | CVE-2025-38361 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: Check dce_hwseq before dereferencing it |
| linux-libc-dev | CVE-2025-38368 | MEDIUM | 5.15.0-161.171 |  | kernel: misc: tps6594-pfsm: Add NULL pointer check in tps6594_pfsm_probe() |
| linux-libc-dev | CVE-2025-38369 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: idxd: Check availability of workqueue allocated by idxd wq driver before using |
| linux-libc-dev | CVE-2025-38373 | MEDIUM | 5.15.0-161.171 |  | kernel: IB/mlx5: Fix potential deadlock in MR deregistration |
| linux-libc-dev | CVE-2025-38408 | MEDIUM | 5.15.0-161.171 |  | kernel: genirq/irq_sim: Initialize work context pointers properly |
| linux-libc-dev | CVE-2025-38409 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm: Fix another leak in the submit error path |
| linux-libc-dev | CVE-2025-38422 | MEDIUM | 5.15.0-161.171 |  | kernel: net: lan743x: Modify the EEPROM and OTP size for PCI1xxxx devices |
| linux-libc-dev | CVE-2025-38425 | MEDIUM | 5.15.0-161.171 |  | kernel: i2c: tegra: check msg length in SMBUS block read |
| linux-libc-dev | CVE-2025-38426 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: Add basic validation for RAS header |
| linux-libc-dev | CVE-2025-38436 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/scheduler: signal scheduled fence when kill job |
| linux-libc-dev | CVE-2025-38437 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix potential use-after-free in oplock/lease break ack |
| linux-libc-dev | CVE-2025-38438 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: SOF: Intel: hda: Use devm_kstrdup() to avoid memleak. |
| linux-libc-dev | CVE-2025-38440 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Fix race between DIM disable and net_dim() |
| linux-libc-dev | CVE-2025-38449 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/gem: Acquire references on GEM handles for framebuffers |
| linux-libc-dev | CVE-2025-38485 | MEDIUM | 5.15.0-161.171 |  | kernel: iio: accel: fxls8962af: Fix use after free in fxls8962af_fifo_flush |
| linux-libc-dev | CVE-2025-38486 | MEDIUM | 5.15.0-161.171 |  | kernel: soundwire: Revert "soundwire: qcom: Add set_channel_map api support" |
| linux-libc-dev | CVE-2025-38491 | MEDIUM | 5.15.0-161.171 |  | kernel: mptcp: make fallback action and fallback decision atomic |
| linux-libc-dev | CVE-2025-38501 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: limit repeated connections from clients with the same IP |
| linux-libc-dev | CVE-2025-38503 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix assertion when building free space tree |
| linux-libc-dev | CVE-2025-38507 | MEDIUM | 5.15.0-161.171 |  | kernel: HID: nintendo: avoid bluetooth suspend/resume stalls |
| linux-libc-dev | CVE-2025-38512 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: prevent A-MSDU attacks in mesh networks |
| linux-libc-dev | CVE-2025-38520 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Don't call mmput from MMU notifier callback |
| linux-libc-dev | CVE-2025-38524 | MEDIUM | 5.15.0-161.171 |  | kernel: rxrpc: Fix recv-recv race of completed call |
| linux-libc-dev | CVE-2025-38531 | MEDIUM | 5.15.0-161.171 |  | kernel: iio: common: st_sensors: Fix use of uninitialize device structs |
| linux-libc-dev | CVE-2025-38544 | MEDIUM | 5.15.0-161.171 |  | kernel: rxrpc: Fix bug due to prealloc collision |
| linux-libc-dev | CVE-2025-38552 | MEDIUM | 5.15.0-161.171 |  | kernel: mptcp: plug races between subflow fail and subflow creation |
| linux-libc-dev | CVE-2025-38556 | MEDIUM | 5.15.0-161.171 |  | kernel: HID: core: Harden s32ton() against conversion to 0 bits |
| linux-libc-dev | CVE-2025-38560 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/sev: Evict cache lines during SNP memory validation |
| linux-libc-dev | CVE-2025-38561 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix Preauh_HashValue race condition |
| linux-libc-dev | CVE-2025-38562 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix null pointer dereference error in generate_encryptionkey |
| linux-libc-dev | CVE-2025-38590 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Remove skb secpath if xfrm state is not found |
| linux-libc-dev | CVE-2025-38591 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Reject narrower access to pointer ctx fields |
| linux-libc-dev | CVE-2025-38595 | MEDIUM | 5.15.0-161.171 |  | kernel: xen: fix UAF in dmabuf_exp_from_pages() |
| linux-libc-dev | CVE-2025-38615 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/ntfs3: cancle set bad inode after removing name fails |
| linux-libc-dev | CVE-2025-38621 | MEDIUM | 5.15.0-161.171 |  | kernel: md: make rdev_addable usable for rcu mode |
| linux-libc-dev | CVE-2025-38626 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to trigger foreground gc during f2fs_map_blocks() in lfs mode |
| linux-libc-dev | CVE-2025-38643 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: cfg80211: Add missing lock in cfg80211_check_and_end_cac() |
| linux-libc-dev | CVE-2025-38644 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211: reject TDLS operations when station is not associated |
| linux-libc-dev | CVE-2025-38659 | MEDIUM | 5.15.0-161.171 |  | kernel: gfs2: No more self recovery |
| linux-libc-dev | CVE-2025-38665 | MEDIUM | 5.15.0-161.171 |  | kernel: can: netlink: can_changelink(): fix NULL pointer deref of struct can_priv::do_set_mode |
| linux-libc-dev | CVE-2025-38669 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "drm/gem-shmem: Use dma_buf from GEM object instance" |
| linux-libc-dev | CVE-2025-38672 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "drm/gem-dma: Use dma_buf from GEM object instance" |
| linux-libc-dev | CVE-2025-38673 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "drm/gem-framebuffer: Use dma_buf from GEM object instance" |
| linux-libc-dev | CVE-2025-38674 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "drm/prime: Use dma_buf from GEM object instance" |
| linux-libc-dev | CVE-2025-38679 | MEDIUM | 5.15.0-161.171 |  | kernel: media: venus: Fix OOB read due to missing payload bound check |
| linux-libc-dev | CVE-2025-38689 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/fpu: Fix NULL dereference in avx512_status() |
| linux-libc-dev | CVE-2025-38692 | MEDIUM | 5.15.0-161.171 |  | kernel: exfat: add cluster chain loop check for dir |
| linux-libc-dev | CVE-2025-38702 | MEDIUM | 5.15.0-161.171 |  | kernel: fbdev: fix potential buffer overflow in do_register_framebuffer() |
| linux-libc-dev | CVE-2025-38703 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/xe: Make dma-fences compliant with the safe access rules |
| linux-libc-dev | CVE-2025-38704 | MEDIUM | 5.15.0-161.171 |  | kernel: rcu/nocb: Fix possible invalid rdp's->nocb_cb_kthread pointer access |
| linux-libc-dev | CVE-2025-38705 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/pm: fix null pointer access |
| linux-libc-dev | CVE-2025-38709 | MEDIUM | 5.15.0-161.171 |  | kernel: loop: Avoid updating block size under exclusive owner |
| linux-libc-dev | CVE-2025-38710 | MEDIUM | 5.15.0-161.171 |  | kernel: gfs2: Validate i_depth for exhash directories |
| linux-libc-dev | CVE-2025-38716 | MEDIUM | 5.15.0-161.171 |  | kernel: hfs: fix general protection fault in hfs_find_init() |
| linux-libc-dev | CVE-2025-38717 | MEDIUM | 5.15.0-161.171 |  | kernel: net: kcm: Fix race condition in kcm_unattach() |
| linux-libc-dev | CVE-2025-38728 | MEDIUM | 5.15.0-161.171 |  | kernel: smb3: fix for slab out of bounds on mount to ksmbd |
| linux-libc-dev | CVE-2025-38734 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: fix UAF on smcsk after smc_listen_out() |
| linux-libc-dev | CVE-2025-39677 | MEDIUM | 5.15.0-161.171 |  | kernel: net/sched: Fix backlog accounting in qdisc_dequeue_internal |
| linux-libc-dev | CVE-2025-39692 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: server: split ksmbd_rdma_stop_listening() out of ksmbd_rdma_destroy() |
| linux-libc-dev | CVE-2025-39705 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: fix a Null pointer dereference vulnerability |
| linux-libc-dev | CVE-2025-39706 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdkfd: Destroy KFD debugfs after destroy KFD wq |
| linux-libc-dev | CVE-2025-39707 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amdgpu: check if hubbub is NULL in debugfs/amdgpu_dm_capabilities |
| linux-libc-dev | CVE-2025-39715 | MEDIUM | 5.15.0-161.171 |  | kernel: parisc: Revise gateway LWS calls to probe user read access |
| linux-libc-dev | CVE-2025-39716 | MEDIUM | 5.15.0-161.171 |  | kernel: parisc: Revise __get_user() to probe user read access |
| linux-libc-dev | CVE-2025-39720 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: fix refcount leak causing resource not released |
| linux-libc-dev | CVE-2025-39726 | MEDIUM | 5.15.0-161.171 |  | kernel: s390/ism: fix concurrency management in ism_cmd() |
| linux-libc-dev | CVE-2025-39732 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath11k: fix sleeping-in-atomic in ath11k_mac_op_set_bitrate_mask() |
| linux-libc-dev | CVE-2025-39744 | MEDIUM | 5.15.0-161.171 |  | kernel: rcu: Fix rcu_read_unlock() deadloop due to IRQ work |
| linux-libc-dev | CVE-2025-39745 | MEDIUM | 5.15.0-161.171 |  | kernel: rcutorture: Fix rcutorture_one_extend_check() splat in RT kernels |
| linux-libc-dev | CVE-2025-39746 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath10k: shutdown driver when hardware is unreliable |
| linux-libc-dev | CVE-2025-39747 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm: Add error handling for krealloc in metadata setup |
| linux-libc-dev | CVE-2025-39748 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Forget ranges when refining tnum after JSET |
| linux-libc-dev | CVE-2025-39750 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Correct tid cleanup when tid setup fails |
| linux-libc-dev | CVE-2025-39753 | MEDIUM | 5.15.0-161.171 |  | kernel: gfs2: Set .migrate_folio in gfs2_{rgrp,meta}_aops |
| linux-libc-dev | CVE-2025-39754 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/smaps: fix race between smaps_hugetlb_range and migration |
| linux-libc-dev | CVE-2025-39759 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: qgroup: fix race between quota disable and quota rescan ioctl |
| linux-libc-dev | CVE-2025-39761 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: ath12k: Decrement TID on RX peer frag setup error handling |
| linux-libc-dev | CVE-2025-39762 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/amd/display: add null check |
| linux-libc-dev | CVE-2025-39763 | MEDIUM | 5.15.0-161.171 |  | kernel: ACPI: APEI: send SIGBUS to current task if synchronous memory error not recovered |
| linux-libc-dev | CVE-2025-39764 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: ctnetlink: remove refcounting in expectation dumpers |
| linux-libc-dev | CVE-2025-39770 | MEDIUM | 5.15.0-161.171 |  | kernel: net: gso: Forbid IPv6 TSO with extensions on devices with only IPV6_CSUM |
| linux-libc-dev | CVE-2025-39771 | MEDIUM | 5.15.0-161.171 |  | kernel: regulator: pca9450: Use devm_register_sys_off_handler |
| linux-libc-dev | CVE-2025-39779 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: subpage: keep TOWRITE tag until folio is cleaned |
| linux-libc-dev | CVE-2025-39781 | MEDIUM | 5.15.0-161.171 |  | kernel: parisc: Drop WARN_ON_ONCE() from flush_cache_vmap |
| linux-libc-dev | CVE-2025-39789 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: x86/aegis - Add missing error checks |
| linux-libc-dev | CVE-2025-39797 | MEDIUM | 5.15.0-161.171 |  | kernel: xfrm: Duplicate SPI Handling |
| linux-libc-dev | CVE-2025-39800 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: abort transaction on unexpected eb generation at btrfs_copy_root() |
| linux-libc-dev | CVE-2025-39810 | MEDIUM | 5.15.0-161.171 |  | kernel: bnxt_en: Fix memory corruption when FW resources change during ifdown |
| linux-libc-dev | CVE-2025-39819 | MEDIUM | 5.15.0-161.171 |  | kernel: fs/smb: Fix inconsistent refcnt update |
| linux-libc-dev | CVE-2025-39825 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix race with concurrent opens in rename(2) |
| linux-libc-dev | CVE-2025-39826 | MEDIUM | 5.15.0-161.171 |  | kernel: net: rose: convert 'use' field to refcount_t |
| linux-libc-dev | CVE-2025-39827 | MEDIUM | 5.15.0-161.171 |  | kernel: net: rose: include node references in rose_neigh refcount |
| linux-libc-dev | CVE-2025-39829 | MEDIUM | 5.15.0-161.171 |  | kernel: trace/fgraph: Fix the warning caused by missing unregister notifier |
| linux-libc-dev | CVE-2025-39833 | MEDIUM | 5.15.0-161.171 |  | kernel: mISDN: hfcpci: Fix warning when deleting uninitialized timer |
| linux-libc-dev | CVE-2025-39838 | MEDIUM | 5.15.0-161.171 |  | kernel: cifs: prevent NULL pointer dereference in UTF16 conversion |
| linux-libc-dev | CVE-2025-39850 | MEDIUM | 5.15.0-161.171 |  | kernel: vxlan: Fix NPD in {arp,neigh}_reduce() when using nexthop objects |
| linux-libc-dev | CVE-2025-39851 | MEDIUM | 5.15.0-161.171 |  | kernel: vxlan: Fix NPD when refreshing an FDB entry with a nexthop object |
| linux-libc-dev | CVE-2025-39859 | MEDIUM | 5.15.0-161.171 |  | kernel: ptp: ocp: fix use-after-free bugs causing by ptp_ocp_watchdog |
| linux-libc-dev | CVE-2025-39863 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: brcmfmac: fix use-after-free when rescheduling brcmf_btcoex_info work |
| linux-libc-dev | CVE-2025-39869 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: ti: edma: Fix memory allocation size for queue_priority_map |
| linux-libc-dev | CVE-2025-39873 | MEDIUM | 5.15.0-161.171 |  | kernel: can: xilinx_can: xcan_write_frame(): fix use-after-free of transmitted SKB |
| linux-libc-dev | CVE-2025-39876 | MEDIUM | 5.15.0-161.171 |  | kernel: net: fec: Fix possible NPD in fec_enet_phy_reset_after_clk_enable() |
| linux-libc-dev | CVE-2025-39877 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/damon/sysfs: fix use-after-free in state_show() |
| linux-libc-dev | CVE-2025-39880 | MEDIUM | 5.15.0-161.171 |  | kernel: libceph: fix invalid accesses to ceph_connection_v1_info |
| linux-libc-dev | CVE-2025-39883 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/memory-failure: fix VM_BUG_ON_PAGE(PagePoisoned(page)) when unpoison memory |
| linux-libc-dev | CVE-2025-39884 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: fix subvolume deletion lockup caused by inodes xarray race |
| linux-libc-dev | CVE-2025-39885 | MEDIUM | 5.15.0-161.171 |  | kernel: ocfs2: fix recursive semaphore deadlock in fiemap call |
| linux-libc-dev | CVE-2025-39886 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Tell memcg to use allow_spinning=false path in bpf_timer_init() |
| linux-libc-dev | CVE-2025-39901 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: remove read access to debugfs files |
| linux-libc-dev | CVE-2025-39905 | MEDIUM | 5.15.0-161.171 |  | kernel: net: phylink: add lock for serializing concurrent pl->phydev writes with resolver |
| linux-libc-dev | CVE-2025-39907 | MEDIUM | 5.15.0-161.171 |  | kernel: mtd: rawnand: stm32_fmc2: avoid overlapping mappings on ECC buffer |
| linux-libc-dev | CVE-2025-39908 | MEDIUM | 5.15.0-161.171 |  | kernel: net: dev_ioctl: take ops lock in hwtstamp lower paths |
| linux-libc-dev | CVE-2025-39911 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: fix IRQ freeing in i40e_vsi_request_irq_msix error path |
| linux-libc-dev | CVE-2025-39913 | MEDIUM | 5.15.0-161.171 |  | kernel: tcp_bpf: Call sk_msg_free() when tcp_bpf_send_verdict() fails to allocate psock->cork |
| linux-libc-dev | CVE-2025-39923 | MEDIUM | 5.15.0-161.171 |  | kernel: dmaengine: qcom: bam_dma: Fix DT error handling for num-channels/ees |
| linux-libc-dev | CVE-2025-39925 | MEDIUM | 5.15.0-161.171 |  | kernel: can: j1939: implement NETDEV_UNREGISTER notification handler |
| linux-libc-dev | CVE-2025-39927 | MEDIUM | 5.15.0-161.171 |  | kernel: ceph: fix race condition validating r_parent before applying state |
| linux-libc-dev | CVE-2025-39929 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: fix smbdirect_recv_io leak in smbd_negotiate() error path |
| linux-libc-dev | CVE-2025-39931 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: af_alg - Set merge to zero early in af_alg_sendmsg |
| linux-libc-dev | CVE-2025-39932 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: let smbd_destroy() call disable_work_sync(&#38;info->post_send_credits_work) |
| linux-libc-dev | CVE-2025-39933 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: let recv_done verify data_offset, data_length and remaining_data_length |
| linux-libc-dev | CVE-2025-39934 | MEDIUM | 5.15.0-161.171 |  | kernel: drm: bridge: anx7625: Fix NULL pointer dereference with early IRQ |
| linux-libc-dev | CVE-2025-39937 | MEDIUM | 5.15.0-161.171 |  | kernel: net: rfkill: gpio: Fix crash due to dereferencering uninitialized pointer |
| linux-libc-dev | CVE-2025-39940 | MEDIUM | 5.15.0-161.171 |  | kernel: dm-stripe: fix a possible integer overflow |
| linux-libc-dev | CVE-2025-39942 | MEDIUM | 5.15.0-161.171 |  | ksmbd: smbdirect: verify remaining_data_length respects max_fragmented_recv_size |
| linux-libc-dev | CVE-2025-39943 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: smbdirect: validate data_offset and data_length field of smb_direct_data_transfer |
| linux-libc-dev | CVE-2025-39945 | MEDIUM | 5.15.0-161.171 |  | kernel: cnic: Fix use-after-free bugs in cnic_delete_task |
| linux-libc-dev | CVE-2025-39947 | MEDIUM | 5.15.0-161.171 |  | kernel: net/mlx5e: Harden uplink netdev access against device unbind |
| linux-libc-dev | CVE-2025-39949 | MEDIUM | 5.15.0-161.171 |  | kernel: qed: Don't collect too many protection override GRC elements |
| linux-libc-dev | CVE-2025-39951 | MEDIUM | 5.15.0-161.171 |  | kernel: um: virtio_uml: Fix use-after-free after put_device in probe |
| linux-libc-dev | CVE-2025-39952 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: wilc1000: avoid buffer overflow in WID string configuration |
| linux-libc-dev | CVE-2025-39953 | MEDIUM | 5.15.0-161.171 |  | kernel: cgroup: split cgroup_destroy_wq into 3 workqueues |
| linux-libc-dev | CVE-2025-39955 | MEDIUM | 5.15.0-161.171 |  | kernel: tcp: Clear tcp_sk(sk)->fastopen_rsk in tcp_disconnect() |
| linux-libc-dev | CVE-2025-39957 | MEDIUM | 5.15.0-161.171 |  | kernel: wifi: mac80211: increase scan_ies_len for S1G |
| linux-libc-dev | CVE-2025-39958 | MEDIUM | 5.15.0-161.171 |  | kernel: iommu/s390: Make attach succeed when the device was surprise removed |
| linux-libc-dev | CVE-2025-39961 | MEDIUM | 5.15.0-161.171 |  | kernel: iommu/amd/pgtbl: Fix possible race while increase page table level |
| linux-libc-dev | CVE-2025-39967 | MEDIUM | 5.15.0-161.171 |  | kernel: fbcon: fix integer overflow in fbcon_do_set_font |
| linux-libc-dev | CVE-2025-39968 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: add max boundary check for VF filters |
| linux-libc-dev | CVE-2025-39969 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: fix validation of VF state in get resources |
| linux-libc-dev | CVE-2025-39970 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: fix input validation logic for action_meta |
| linux-libc-dev | CVE-2025-39971 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: fix idx validation in config queues msg |
| linux-libc-dev | CVE-2025-39972 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: fix idx validation in i40e_validate_queue_map |
| linux-libc-dev | CVE-2025-39973 | MEDIUM | 5.15.0-161.171 |  | kernel: i40e: add validation for ring_len param |
| linux-libc-dev | CVE-2025-39977 | MEDIUM | 5.15.0-161.171 |  | kernel: futex: Prevent use-after-free during requeue-PI |
| linux-libc-dev | CVE-2025-39978 | MEDIUM | 5.15.0-161.171 |  | kernel: octeontx2-pf: Fix potential use after free in otx2_tc_add_flow() |
| linux-libc-dev | CVE-2025-39980 | MEDIUM | 5.15.0-161.171 |  | kernel: nexthop: Forbid FDB status change while nexthop is in a group |
| linux-libc-dev | CVE-2025-39985 | MEDIUM | 5.15.0-161.171 |  | kernel: can: mcba_usb: populate ndo_change_mtu() to prevent buffer overflow |
| linux-libc-dev | CVE-2025-39986 | MEDIUM | 5.15.0-161.171 |  | kernel: can: sun4i_can: populate ndo_change_mtu() to prevent buffer overflow |
| linux-libc-dev | CVE-2025-39987 | MEDIUM | 5.15.0-161.171 |  | kernel: can: hi311x: populate ndo_change_mtu() to prevent buffer overflow |
| linux-libc-dev | CVE-2025-39988 | MEDIUM | 5.15.0-161.171 |  | kernel: can: etas_es58x: populate ndo_change_mtu() to prevent buffer overflow |
| linux-libc-dev | CVE-2025-39989 | MEDIUM | 5.15.0-161.171 |  | kernel: x86/mce: use is_copy_from_user() to determine copy-from-user context |
| linux-libc-dev | CVE-2025-39990 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Check the helper function is valid in get_helper_proto |
| linux-libc-dev | CVE-2025-39992 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: swap: check for stable address space before operating on the VMA |
| linux-libc-dev | CVE-2025-39994 | MEDIUM | 5.15.0-161.171 |  | kernel: media: tuner: xc5000: Fix use-after-free in xc5000_release |
| linux-libc-dev | CVE-2025-39995 | MEDIUM | 5.15.0-161.171 |  | kernel: media: i2c: tc358743: Fix use-after-free bugs caused by orphan timer in probe |
| linux-libc-dev | CVE-2025-39996 | MEDIUM | 5.15.0-161.171 |  | kernel: media: b2c2: Fix use-after-free causing by irq_check_work in flexcop_pci_remove |
| linux-libc-dev | CVE-2025-39998 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: target: target_core_configfs: Add length check to avoid buffer overflow |
| linux-libc-dev | CVE-2025-40001 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mvsas: Fix use-after-free bugs in mvs_work_queue |
| linux-libc-dev | CVE-2025-40003 | MEDIUM | 5.15.0-161.171 |  | kernel: net: mscc: ocelot: Fix use-after-free caused by cyclic delayed work |
| linux-libc-dev | CVE-2025-40005 | MEDIUM | 5.15.0-161.171 |  | kernel: spi: cadence-quadspi: Implement refcount to handle unbind during busy |
| linux-libc-dev | CVE-2025-40006 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/hugetlb: fix folio is still mapped when deleted |
| linux-libc-dev | CVE-2025-40011 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/gma500: Fix null dereference in hdmi teardown |
| linux-libc-dev | CVE-2025-40012 | MEDIUM | 5.15.0-161.171 |  | kernel: net/smc: fix warning in smc_rx_splice() when calling get_page() |
| linux-libc-dev | CVE-2025-40016 | MEDIUM | 5.15.0-161.171 |  | kernel: media: uvcvideo: Mark invalid entities with id UVC_INVALID_ENTITY_ID |
| linux-libc-dev | CVE-2025-40019 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: essiv - Check ssize for decryption and in-place encryption |
| linux-libc-dev | CVE-2025-40020 | MEDIUM | 5.15.0-161.171 |  | kernel: can: peak_usb: fix shift-out-of-bounds issue |
| linux-libc-dev | CVE-2025-40021 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing: dynevent: Add a missing lockdown check on dynevent |
| linux-libc-dev | CVE-2025-40025 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to do sanity check on node footer for non inode dnode |
| linux-libc-dev | CVE-2025-40026 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: x86: Don't (re)check L1 intercepts when completing userspace I/O |
| linux-libc-dev | CVE-2025-40027 | MEDIUM | 5.15.0-161.171 |  | kernel: net/9p: fix double req put in p9_fd_cancelled |
| linux-libc-dev | CVE-2025-40029 | MEDIUM | 5.15.0-161.171 |  | kernel: bus: fsl-mc: Check return value of platform_get_resource() |
| linux-libc-dev | CVE-2025-40030 | MEDIUM | 5.15.0-161.171 |  | kernel: pinctrl: check the return value of pinmux_ops::get_function_name() |
| linux-libc-dev | CVE-2025-40032 | MEDIUM | 5.15.0-161.171 |  | kernel: PCI: endpoint: pci-epf-test: Add NULL check for DMA channels before release |
| linux-libc-dev | CVE-2025-40035 | MEDIUM | 5.15.0-161.171 |  | kernel: Input: uinput - zero-initialize uinput_ff_upload_compat to avoid info leak |
| linux-libc-dev | CVE-2025-40036 | MEDIUM | 5.15.0-161.171 |  | kernel: misc: fastrpc: fix possible map leak in fastrpc_put_args |
| linux-libc-dev | CVE-2025-40039 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: Fix race condition in RPC handle list access |
| linux-libc-dev | CVE-2025-40040 | MEDIUM | 5.15.0-161.171 |  | kernel: mm/ksm: fix flag-dropping behavior in ksm_madvise |
| linux-libc-dev | CVE-2025-40042 | MEDIUM | 5.15.0-161.171 |  | kernel: tracing: Fix race condition in kprobe initialization causing NULL pointer dereference |
| linux-libc-dev | CVE-2025-40043 | MEDIUM | 5.15.0-161.171 |  | kernel: net: nfc: nci: Add parameter validation for packet data |
| linux-libc-dev | CVE-2025-40044 | MEDIUM | 5.15.0-161.171 |  | kernel: fs: udf: fix OOB read in lengthAllocDescs handling |
| linux-libc-dev | CVE-2025-40048 | MEDIUM | 5.15.0-161.171 |  | kernel: uio_hv_generic: Let userspace take care of interrupt mask |
| linux-libc-dev | CVE-2025-40049 | MEDIUM | 5.15.0-161.171 |  | kernel: Squashfs: fix uninit-value in squashfs_get_parent |
| linux-libc-dev | CVE-2025-40053 | MEDIUM | 5.15.0-161.171 |  | kernel: net: dlink: handle copy_thresh allocation failure |
| linux-libc-dev | CVE-2025-40054 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix UAF issue in f2fs_merge_page_bio() |
| linux-libc-dev | CVE-2025-40055 | MEDIUM | 5.15.0-161.171 |  | kernel: ocfs2: fix double free in user_cluster_connect() |
| linux-libc-dev | CVE-2025-40057 | MEDIUM | 5.15.0-161.171 |  | kernel: ptp: Add a upper bound on max_vclocks |
| linux-libc-dev | CVE-2025-40060 | MEDIUM | 5.15.0-161.171 |  | kernel: coresight: trbe: Return NULL pointer for allocation failures |
| linux-libc-dev | CVE-2025-40064 | MEDIUM | 5.15.0-161.171 |  | kernel: smc: Fix use-after-free in __pnet_find_base_ndev() |
| linux-libc-dev | CVE-2025-40068 | MEDIUM | 5.15.0-161.171 |  | kernel: fs: ntfs3: Fix integer overflow in run_unpack() |
| linux-libc-dev | CVE-2025-40070 | MEDIUM | 5.15.0-161.171 |  | kernel: pps: fix warning in pps_register_cdev when register device fail |
| linux-libc-dev | CVE-2025-40071 | MEDIUM | 5.15.0-161.171 |  | kernel: tty: n_gsm: Don't block input queue by waiting MSC |
| linux-libc-dev | CVE-2025-40073 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/msm: Do not validate SSPP when it is not ready |
| linux-libc-dev | CVE-2025-40074 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv4: start using dst_dev_rcu() |
| linux-libc-dev | CVE-2025-40075 | MEDIUM | 5.15.0-161.171 |  | kernel: tcp_metrics: use dst_dev_net_rcu() |
| linux-libc-dev | CVE-2025-40077 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to avoid overflow while left shift operation |
| linux-libc-dev | CVE-2025-40078 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Explicitly check accesses to bpf_sock_addr |
| linux-libc-dev | CVE-2025-40080 | MEDIUM | 5.15.0-161.171 |  | kernel: nbd: restrict sockets to TCP and UDP |
| linux-libc-dev | CVE-2025-40081 | MEDIUM | 5.15.0-161.171 |  | kernel: perf: arm_spe: Prevent overflow in PERF_IDX2OFF() |
| linux-libc-dev | CVE-2025-40082 | MEDIUM | 5.15.0-161.171 |  | kernel: hfsplus: fix slab-out-of-bounds read in hfsplus_uni2asc() |
| linux-libc-dev | CVE-2025-40083 | MEDIUM | 5.15.0-161.171 |  | kernel: net/sched: sch_qfq: Fix null-deref in agg_dequeue |
| linux-libc-dev | CVE-2025-40084 | MEDIUM | 5.15.0-161.171 |  | kernel: ksmbd: transport_ipc: validate payload size before reading handle |
| linux-libc-dev | CVE-2025-40085 | MEDIUM | 5.15.0-161.171 |  | kernel: ALSA: usb-audio: Fix NULL pointer deference in try_to_register_card |
| linux-libc-dev | CVE-2025-40087 | MEDIUM | 5.15.0-161.171 |  | kernel: NFSD: Define a proc_layoutcommit for the FlexFiles layout type |
| linux-libc-dev | CVE-2025-40088 | MEDIUM | 5.15.0-161.171 |  | kernel: hfsplus: fix slab-out-of-bounds read in hfsplus_strcasecmp() |
| linux-libc-dev | CVE-2025-40092 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: f_ncm: Refactor bind path to use __free() |
| linux-libc-dev | CVE-2025-40093 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: f_ecm: Refactor bind path to use __free() |
| linux-libc-dev | CVE-2025-40094 | MEDIUM | 5.15.0-161.171 |  | usb: gadget: f_acm: Refactor bind path to use __free() |
| linux-libc-dev | CVE-2025-40095 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: gadget: f_rndis: Refactor bind path to use __free() |
| linux-libc-dev | CVE-2025-40097 | MEDIUM | 5.15.0-161.171 |  | kernel: ALSA: hda: Fix missing pointer check in hda_component_manager_init function |
| linux-libc-dev | CVE-2025-40099 | MEDIUM | 5.15.0-161.171 |  | kernel: cifs: parse_dfs_referrals: prevent oob on malformed input |
| linux-libc-dev | CVE-2025-40100 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: do not assert we found block group item when creating free space tree |
| linux-libc-dev | CVE-2025-40102 | MEDIUM | 5.15.0-161.171 |  | kernel: KVM: arm64: Prevent access to vCPU events before init |
| linux-libc-dev | CVE-2025-40103 | MEDIUM | 5.15.0-161.171 |  | kernel: smb: client: Fix refcount leak for cifs_sb_tlink |
| linux-libc-dev | CVE-2025-40104 | MEDIUM | 5.15.0-161.171 |  | kernel: ixgbevf: fix mailbox API compatibility by negotiating supported features |
| linux-libc-dev | CVE-2025-40105 | MEDIUM | 5.15.0-161.171 |  | kernel: vfs: Don't leak disconnected dentries on umount |
| linux-libc-dev | CVE-2025-40106 | MEDIUM | 5.15.0-161.171 |  | kernel: comedi: fix divide-by-zero in comedi_buf_munge() |
| linux-libc-dev | CVE-2025-40107 | MEDIUM | 5.15.0-161.171 |  | kernel: can: hi311x: fix null pointer dereference when resuming from sleep before interface was enabled |
| linux-libc-dev | CVE-2025-40109 | MEDIUM | 5.15.0-161.171 |  | kernel: crypto: rng - Ensure set_ent is always present |
| linux-libc-dev | CVE-2025-40110 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vmwgfx: Fix a null-ptr access in the cursor snooper |
| linux-libc-dev | CVE-2025-40111 | MEDIUM | 5.15.0-161.171 |  | kernel: drm/vmwgfx: Fix Use-after-free in validation |
| linux-libc-dev | CVE-2025-40112 | MEDIUM | 5.15.0-161.171 |  | In the Linux kernel, the following vulnerability has been resolved:  s ... |
| linux-libc-dev | CVE-2025-40115 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: mpt3sas: Fix crash in transport port remove by using ioc_info() |
| linux-libc-dev | CVE-2025-40116 | MEDIUM | 5.15.0-161.171 |  | kernel: usb: host: max3421-hcd: Fix error pointer dereference in probe cleanup |
| linux-libc-dev | CVE-2025-40118 | MEDIUM | 5.15.0-161.171 |  | kernel: scsi: pm80xx: Fix array-index-out-of-of-bounds on rmmod |
| linux-libc-dev | CVE-2025-40120 | MEDIUM | 5.15.0-161.171 |  | kernel: net: usb: asix: hold PM usage ref to avoid PM/MDIO + RTNL deadlock |
| linux-libc-dev | CVE-2025-40121 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: Intel: bytcr_rt5651: Fix invalid quirk input mapping |
| linux-libc-dev | CVE-2025-40123 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Enforce expected_attach_type for tailcall compatibility |
| linux-libc-dev | CVE-2025-40124 | MEDIUM | 5.15.0-161.171 |  | kernel: sparc: fix accurate exception reporting in copy_{from_to}_user for UltraSPARC III |
| linux-libc-dev | CVE-2025-40125 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-mq: check kobject state_in_sysfs before deleting in blk_mq_unregister_hctx |
| linux-libc-dev | CVE-2025-40126 | MEDIUM | 5.15.0-161.171 |  | kernel: sparc: fix accurate exception reporting in copy_{from_to}_user for UltraSPARC |
| linux-libc-dev | CVE-2025-40127 | MEDIUM | 5.15.0-161.171 |  | kernel: hwrng: ks-sa - fix division by zero in ks_sa_rng_init |
| linux-libc-dev | CVE-2025-40134 | MEDIUM | 5.15.0-161.171 |  | kernel: dm: fix NULL pointer dereference in __dm_suspend() |
| linux-libc-dev | CVE-2025-40135 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv6: use RCU in ip6_xmit() |
| linux-libc-dev | CVE-2025-40137 | MEDIUM | 5.15.0-161.171 |  | kernel: f2fs: fix to truncate first page in error path of f2fs_truncate() |
| linux-libc-dev | CVE-2025-40139 | MEDIUM | 5.15.0-161.171 |  | kernel: smc: Use __sk_dst_get() and dst_dev_rcu() in in smc_clc_prfx_set() |
| linux-libc-dev | CVE-2025-40140 | MEDIUM | 5.15.0-161.171 |  | kernel: net: usb: Remove disruptive netif_wake_queue in rtl8150_set_multicast |
| linux-libc-dev | CVE-2025-40146 | MEDIUM | 5.15.0-161.171 |  | kernel: blk-mq: fix potential deadlock while nr_requests grown |
| linux-libc-dev | CVE-2025-40149 | MEDIUM | 5.15.0-161.171 |  | kernel: tls: Use __sk_dst_get() and dst_dev_rcu() in get_netdev_for_sock() |
| linux-libc-dev | CVE-2025-40153 | MEDIUM | 5.15.0-161.171 |  | kernel: mm: hugetlb: avoid soft lockup when mprotect to large memory area |
| linux-libc-dev | CVE-2025-40154 | MEDIUM | 5.15.0-161.171 |  | kernel: ASoC: Intel: bytcr_rt5640: Fix invalid quirk input mapping |
| linux-libc-dev | CVE-2025-40158 | MEDIUM | 5.15.0-161.171 |  | kernel: ipv6: use RCU in ip6_output() |
| linux-libc-dev | CVE-2025-40160 | MEDIUM | 5.15.0-161.171 |  | kernel: xen/events: Return -EEXIST for bound VIRQs |
| linux-libc-dev | CVE-2025-40164 | MEDIUM | 5.15.0-161.171 |  | kernel: usbnet: Fix using smp_processor_id() in preemptible code warnings |
| linux-libc-dev | CVE-2025-40167 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: detect invalid INLINE_DATA + EXTENTS flag combination |
| linux-libc-dev | CVE-2025-40168 | MEDIUM | 5.15.0-161.171 |  | kernel: smc: Use __sk_dst_get() and dst_dev_rcu() in smc_clc_prfx_match() |
| linux-libc-dev | CVE-2025-40170 | MEDIUM | 5.15.0-161.171 |  | kernel: net: use dst_dev_rcu() in sk_setup_caps() |
| linux-libc-dev | CVE-2025-40171 | MEDIUM | 5.15.0-161.171 |  | kernel: nvmet-fc: move lsop put work to nvmet_fc_ls_req_op |
| linux-libc-dev | CVE-2025-40173 | MEDIUM | 5.15.0-161.171 |  | kernel: net/ip6_tunnel: Prevent perpetual tunnel growth |
| linux-libc-dev | CVE-2025-40178 | MEDIUM | 5.15.0-161.171 |  | kernel: pid: Add a judgment for ns null in pid_nr_ns |
| linux-libc-dev | CVE-2025-40179 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: verify orphan file size is not too big |
| linux-libc-dev | CVE-2025-40180 | MEDIUM | 5.15.0-161.171 |  | kernel: mailbox: zynqmp-ipi: Fix out-of-bounds access in mailbox cleanup loop |
| linux-libc-dev | CVE-2025-40183 | MEDIUM | 5.15.0-161.171 |  | kernel: bpf: Fix metadata_dst leak __bpf_redirect_neigh_v{4,6} |
| linux-libc-dev | CVE-2025-40187 | MEDIUM | 5.15.0-161.171 |  | kernel: net/sctp: fix a null dereference in sctp_disposition sctp_sf_do_5_1D_ce() |
| linux-libc-dev | CVE-2025-40188 | MEDIUM | 5.15.0-161.171 |  | kernel: pwm: berlin: Fix wrong register in suspend/resume |
| linux-libc-dev | CVE-2025-40190 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: guard against EA inode refcount underflow in xattr update |
| linux-libc-dev | CVE-2025-40192 | MEDIUM | 5.15.0-161.171 |  | kernel: Revert "ipmi: fix msg stack when IPMI is disconnected" |
| linux-libc-dev | CVE-2025-40193 | MEDIUM | 5.15.0-161.171 |  | kernel: xtensa: simdisk: add input size check in proc_write_simdisk |
| linux-libc-dev | CVE-2025-40194 | MEDIUM | 5.15.0-161.171 |  | kernel: cpufreq: intel_pstate: Fix object lifecycle issue in update_qos_request() |
| linux-libc-dev | CVE-2025-40195 | MEDIUM | 5.15.0-161.171 |  | kernel: Linux kernel: NULL pointer dereference in mount leads to local denial of service |
| linux-libc-dev | CVE-2025-40196 | MEDIUM | 5.15.0-161.171 |  | kernel: fs: quota: create dedicated workqueue for quota_release_work |
| linux-libc-dev | CVE-2025-40198 | MEDIUM | 5.15.0-161.171 |  | kernel: ext4: avoid potential buffer over-read in parse_apply_sb_mount_options() |
| linux-libc-dev | CVE-2025-40200 | MEDIUM | 5.15.0-161.171 |  | kernel: Squashfs: reject negative file sizes in squashfs_read_inode() |
| linux-libc-dev | CVE-2025-40204 | MEDIUM | 5.15.0-161.171 |  | kernel: sctp: Fix MAC comparison to be constant-time |
| linux-libc-dev | CVE-2025-40205 | MEDIUM | 5.15.0-161.171 |  | kernel: btrfs: avoid potential out-of-bounds in btrfs_encode_fh() |
| linux-libc-dev | CVE-2025-40206 | MEDIUM | 5.15.0-161.171 |  | kernel: netfilter: nft_objref: validate objref and objrefmap expressions |
| linux-libc-dev | CVE-2025-40208 | MEDIUM | 5.15.0-161.171 |  | kernel: media: iris: fix module removal if firmware download failed |
| linux-libc-dev | CVE-2025-40325 | MEDIUM | 5.15.0-161.171 |  | kernel: md/raid10: wait barrier before returning discard request with REQ_NOWAIT |
| linux-libc-dev | CVE-2017-0537 | LOW | 5.15.0-161.171 |  |  |
| linux-libc-dev | CVE-2017-13165 | LOW | 5.15.0-161.171 |  |  |
| linux-libc-dev | CVE-2017-13693 | LOW | 5.15.0-161.171 |  | kernel: ACPI operand cache leak in dsutils.c |
| linux-libc-dev | CVE-2018-1121 | LOW | 5.15.0-161.171 |  | procps: process hiding through race condition enumerating /proc |
| linux-libc-dev | CVE-2018-12928 | LOW | 5.15.0-161.171 |  | kernel: NULL pointer dereference in hfs_ext_read_extent in hfs.ko |
| linux-libc-dev | CVE-2018-12929 | LOW | 5.15.0-161.171 |  | kernel: use-after-free in ntfs_read_locked_inode in the ntfs.ko |
| linux-libc-dev | CVE-2018-12930 | LOW | 5.15.0-161.171 |  | kernel: stack-based out-of-bounds write in ntfs_end_buffer_async_read in the ntfs.ko |
| linux-libc-dev | CVE-2018-12931 | LOW | 5.15.0-161.171 |  | kernel: stack-based out-of-bounds write in ntfs_attr_find in the ntfs.ko |
| linux-libc-dev | CVE-2019-14899 | LOW | 5.15.0-161.171 |  | VPN: an attacker can inject data into the TCP stream which allows a hijack of active connections inside the VPN tunnel |
| linux-libc-dev | CVE-2019-15213 | LOW | 5.15.0-161.171 |  | kernel: use-after-free caused by malicious USB device in drivers/media/usb/dvb-usb/dvb-usb-init.c |
| linux-libc-dev | CVE-2019-19378 | LOW | 5.15.0-161.171 |  | kernel: out-of-bounds write in index_rbio_pages in fs/btrfs/raid56.c |
| linux-libc-dev | CVE-2019-19814 | LOW | 5.15.0-161.171 |  | kernel: out-of-bounds write in __remove_dirty_segment in fs/f2fs/segment.c |
| linux-libc-dev | CVE-2019-20426 | LOW | 5.15.0-161.171 |  |  |
| linux-libc-dev | CVE-2020-14304 | LOW | 5.15.0-161.171 |  | kernel: ethtool when reading eeprom of device could lead to memory leak |
| linux-libc-dev | CVE-2020-35501 | LOW | 5.15.0-161.171 |  | kernel: audit not logging access to syscall open_by_handle_at for users with CAP_DAC_READ_SEARCH capability |
| linux-libc-dev | CVE-2021-26934 | LOW | 5.15.0-161.171 |  | An issue was discovered in the Linux kernel 4.18 through 5.10.16, as u ... |
| linux-libc-dev | CVE-2022-3114 | LOW | 5.15.0-161.171 |  | kernel: clk: imx: NULL pointer dereference in imx_register_uart_clocks() |
| linux-libc-dev | CVE-2022-41848 | LOW | 5.15.0-161.171 |  | kernel: Race condition between mgslpc_ioctl and mgslpc_detach |
| linux-libc-dev | CVE-2022-44032 | LOW | 5.15.0-161.171 |  | Kernel: Race between cmm_open() and cm4000_detach() result in UAF |
| linux-libc-dev | CVE-2022-44033 | LOW | 5.15.0-161.171 |  | Kernel: A race condition between cm4040_open() and reader_detach() may result in UAF |
| linux-libc-dev | CVE-2022-44034 | LOW | 5.15.0-161.171 |  | Kernel: A use-after-free due to race between scr24x_open()  and scr24x_remove() |
| linux-libc-dev | CVE-2022-45885 | LOW | 5.15.0-161.171 |  | kernel: use-after-free due to race condition occurring in dvb_frontend.c |
| linux-libc-dev | CVE-2022-45888 | LOW | 5.15.0-161.171 |  | kernel: use-after-free due to race condition in drivers/char/xillybus/xillyusb.c |
| linux-libc-dev | CVE-2023-33053 | LOW | 5.15.0-161.171 |  |  |
| linux-libc-dev | CVE-2023-4010 | LOW | 5.15.0-161.171 |  | kernel: usb: hcd: malformed USB descriptor leads to infinite loop in usb_giveback_urb() |
| linux-libc-dev | CVE-2023-4133 | LOW | 5.15.0-161.171 |  | kernel: cxgb4: use-after-free in ch_flower_stats_cb() |
| linux-libc-dev | CVE-2023-52749 | LOW | 5.15.0-161.171 |  | kernel: spi: Fix null dereference on suspend |
| linux-libc-dev | CVE-2023-53052 | LOW | 5.15.0-161.171 |  | kernel: cifs: fix use-after-free bug in refresh_cache_worker() |
| linux-libc-dev | CVE-2024-0564 | LOW | 5.15.0-161.171 |  | kernel: max page sharing of Kernel Samepage Merging (KSM) may cause memory deduplication |
| linux-libc-dev | CVE-2024-26983 | LOW | 5.15.0-161.171 |  | kernel: bootconfig: use memblock_free_late to free xbc memory to buddy |
| linux-libc-dev | CVE-2024-27010 | LOW | 5.15.0-161.171 |  | kernel: net/sched: Fix mirred deadlock on device recursion |
| linux-libc-dev | CVE-2024-27011 | LOW | 5.15.0-161.171 |  | kernel: netfilter: nf_tables: fix memleak in map from abort path |
| linux-libc-dev | CVE-2024-49934 | LOW | 5.15.0-161.171 |  | kernel: fs/inode: Prevent dump_mapping() accessing invalid dentry.d_name.name |
| linux-libc-dev | CVE-2024-49968 | LOW | 5.15.0-161.171 |  | kernel: ext4: filesystems without casefold feature cannot be mounted with siphash |
| linux-libc-dev | CVE-2024-50183 | LOW | 5.15.0-161.171 |  | kernel: scsi: lpfc: Ensure DA_ID handling completion before deleting an NPIV instance |
| linux-libc-dev | CVE-2024-50217 | LOW | 5.15.0-161.171 |  | kernel: btrfs: fix use-after-free of block device file in __btrfs_free_extra_devids() |
| linux-libc-dev | CVE-2024-53093 | LOW | 5.15.0-161.171 |  | kernel: nvme-multipath: defer partition scanning |
| linux-libc-dev | CVE-2024-58237 | LOW | 5.15.0-161.171 |  | kernel: bpf: consider that tail calls invalidate packet pointers |
| linux-libc-dev | CVE-2025-21645 | LOW | 5.15.0-161.171 |  | kernel: platform/x86/amd/pmc: Only disable IRQ1 wakeup where i8042 actually enabled it |
| linux-libc-dev | CVE-2025-21714 | LOW | 5.15.0-161.171 |  | kernel: RDMA/mlx5: Fix implicit ODP use after free |
| linux-libc-dev | CVE-2025-37800 | LOW | 5.15.0-161.171 |  | kernel: driver core: fix potential NULL pointer dereference in dev_uevent() |
| linux-libc-dev | CVE-2025-38584 | LOW | 5.15.0-161.171 |  | kernel: padata: Fix pd UAF once and for all |
| login | CVE-2023-29383 | LOW | 1:4.8.1-2ubuntu2.2 |  | shadow: Improper input validation in shadow-utils package utility chfn |
| login | CVE-2024-56433 | LOW | 1:4.8.1-2ubuntu2.2 |  | shadow-utils: Default subordinate ID configuration in /etc/login.defs could lead to compromise |
| ncurses-base | CVE-2023-50495 | LOW | 6.3-2ubuntu0.1 |  | ncurses: segmentation fault via _nc_wrap_entry() |
| ncurses-bin | CVE-2023-50495 | LOW | 6.3-2ubuntu0.1 |  | ncurses: segmentation fault via _nc_wrap_entry() |
| nodejs | CVE-2023-44487 | HIGH | 22.21.0-1nodesource1 |  | HTTP/2: Multiple HTTP/2 enabled web servers are vulnerable to a DDoS attack (Rapid Reset Attack) |
| nodejs | CVE-2021-44532 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: Certificate Verification Bypass via String Injection |
| nodejs | CVE-2022-40735 | MEDIUM | 22.21.0-1nodesource1 |  |  |
| nodejs | CVE-2023-38552 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: integrity checks according to policies can be circumvented |
| nodejs | CVE-2023-39333 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: code injection via WebAssembly export names |
| nodejs | CVE-2023-46809 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: vulnerable to timing variant of the Bleichenbacher attack against PKCS#1 v1.5 padding (Marvin) |
| nodejs | CVE-2023-5363 | MEDIUM | 22.21.0-1nodesource1 |  | openssl: Incorrect cipher key and IV length processing |
| nodejs | CVE-2024-22018 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: fs.lstat bypasses permission model |
| nodejs | CVE-2024-22025 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: using the fetch() function to retrieve content from an untrusted URL leads to denial of service |
| nodejs | CVE-2024-27982 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: HTTP Request Smuggling via Content Length Obfuscation |
| nodejs | CVE-2024-27983 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: CONTINUATION frames DoS |
| nodejs | CVE-2024-6119 | MEDIUM | 22.21.0-1nodesource1 |  | openssl: Possible denial of service in X.509 name checks |
| nodejs | CVE-2025-23085 | MEDIUM | 22.21.0-1nodesource1 |  | nodejs: GOAWAY HTTP/2 frames cause memory leak outside heap |
| nodejs | CVE-2025-9230 | MEDIUM | 22.21.0-1nodesource1 |  | openssl: Out-of-bounds read & write in RFC 3211 KEK Unwrap |
| nodejs | CVE-2025-9231 | MEDIUM | 22.21.0-1nodesource1 |  | openssl: Timing side-channel in SM2 algorithm on 64 bit ARM |
| nodejs | CVE-2019-1563 | LOW | 22.21.0-1nodesource1 |  | openssl: information disclosure in PKCS7_dataDecode and CMS_decrypt_set1_pkey |
| nodejs | CVE-2021-22930 | LOW | 22.21.0-1nodesource1 |  | nodejs: Use-after-free on close http2 on stream canceling |
| nodejs | CVE-2021-23840 | LOW | 22.21.0-1nodesource1 |  | openssl: integer overflow in CipherUpdate |
| nodejs | CVE-2023-0464 | LOW | 22.21.0-1nodesource1 |  | openssl: Denial of service by excessive resource usage in verifying X509 policy constraints |
| nodejs | CVE-2023-0465 | LOW | 22.21.0-1nodesource1 |  | openssl: Invalid certificate policies in leaf certificates are silently ignored |
| nodejs | CVE-2023-0466 | LOW | 22.21.0-1nodesource1 |  | openssl: Certificate policy check not enabled |
| nodejs | CVE-2023-1255 | LOW | 22.21.0-1nodesource1 |  | openssl: Input buffer over-read in AES-XTS implementation on 64 bit ARM |
| nodejs | CVE-2023-2975 | LOW | 22.21.0-1nodesource1 |  | openssl: AES-SIV cipher implementation contains a bug that causes it to ignore empty associated data entries |
| nodejs | CVE-2023-3446 | LOW | 22.21.0-1nodesource1 |  | openssl: Excessive time spent checking DH keys and parameters |
| nodejs | CVE-2023-3817 | LOW | 22.21.0-1nodesource1 |  | OpenSSL: Excessive time spent checking DH q parameter value |
| nodejs | CVE-2023-5678 | LOW | 22.21.0-1nodesource1 |  | openssl: Generating excessively long X9.42 DH keys or checking excessively long X9.42 DH keys or parameters may be very slow |
| nodejs | CVE-2023-6129 | LOW | 22.21.0-1nodesource1 |  | openssl: POLY1305 MAC implementation corrupts vector registers on PowerPC |
| nodejs | CVE-2023-6237 | LOW | 22.21.0-1nodesource1 |  | openssl: Excessive time spent checking invalid RSA public keys |
| nodejs | CVE-2024-0727 | LOW | 22.21.0-1nodesource1 |  | openssl: denial of service via null dereference |
| nodejs | CVE-2024-13176 | LOW | 22.21.0-1nodesource1 |  | openssl: Timing side-channel in ECDSA signature computation |
| nodejs | CVE-2024-2511 | LOW | 22.21.0-1nodesource1 |  | openssl: Unbounded memory growth with session handling in TLSv1.3 |
| nodejs | CVE-2024-4603 | LOW | 22.21.0-1nodesource1 |  | openssl: Excessive time spent checking DSA keys and parameters |
| nodejs | CVE-2024-4741 | LOW | 22.21.0-1nodesource1 |  | openssl: Use After Free with SSL_free_buffers |
| nodejs | CVE-2024-5535 | LOW | 22.21.0-1nodesource1 |  | openssl: SSL_select_next_proto buffer overread |
| nodejs | CVE-2024-9143 | LOW | 22.21.0-1nodesource1 |  | openssl: Low-level invalid GF(2^m) parameters lead to OOB memory access |
| nodejs | CVE-2025-27587 | LOW | 22.21.0-1nodesource1 |  | OpenSSL 3.0.0 through 3.3.2 on the PowerPC architecture is vulnerable  ... |
| nodejs | CVE-2025-9232 | LOW | 22.21.0-1nodesource1 |  | openssl: Out-of-bounds read in HTTP client no_proxy handling |
| openssl | CVE-2024-41996 | LOW | 3.0.2-0ubuntu1.20 |  | openssl: remote attackers (from the client side) to trigger unnecessarily expensive server-side DHE modular-exponentiation calculations |
| passwd | CVE-2023-29383 | LOW | 1:4.8.1-2ubuntu2.2 |  | shadow: Improper input validation in shadow-utils package utility chfn |
| passwd | CVE-2024-56433 | LOW | 1:4.8.1-2ubuntu2.2 |  | shadow-utils: Default subordinate ID configuration in /etc/login.defs could lead to compromise |
| patch | CVE-2018-6952 | LOW | 2.7.6-7build2 |  | patch: Double free of memory in pch.c:another_hunk() causes a crash |
| patch | CVE-2021-45261 | LOW | 2.7.6-7build2 |  | patch: Invalid Pointer via another_hunk function |
| pkexec | CVE-2016-2568 | LOW | 0.105-33 |  | polkit: Program run via pkexec as unprivileged user can escape to parent session via TIOCSTI ioctl |
| policykit-1 | CVE-2016-2568 | LOW | 0.105-33 |  | polkit: Program run via pkexec as unprivileged user can escape to parent session via TIOCSTI ioctl |
| polkitd | CVE-2016-2568 | LOW | 0.105-33 |  | polkit: Program run via pkexec as unprivileged user can escape to parent session via TIOCSTI ioctl |
| python3-httplib2 | CVE-2021-21240 | LOW | 0.20.2-2 |  | python-httplib2: Regular expression denial of service via malicious header |
| python3-pip | CVE-2024-35195 | MEDIUM | 22.0.2+dfsg-1ubuntu0.7 |  | requests: subsequent requests to the same host ignore cert verification |
| python3-pip | CVE-2025-47273 | MEDIUM | 22.0.2+dfsg-1ubuntu0.7 |  | setuptools: Path Traversal Vulnerability in setuptools PackageIndex |
| python3.10 | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| python3.10 | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| python3.10-dev | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| python3.10-dev | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| python3.10-minimal | CVE-2025-6075 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | python: Quadratic complexity in os.path.expandvars() with user-controlled template |
| python3.10-minimal | CVE-2025-8291 | MEDIUM | 3.10.12-1~22.04.11 | 3.10.12-1~22.04.12 | cpython: python: Python zipfile End of Central Directory (EOCD) Locator record offset not checked |
| systemd | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| systemd-sysv | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| systemd-timesyncd | CVE-2023-7008 | LOW | 249.11-0ubuntu3.17 |  | systemd-resolved: Unsigned name response in signed zone is not refused when DNSSEC=yes |
| tar | CVE-2025-45582 | MEDIUM | 1.34+dfsg-1ubuntu0.1.22.04.2 |  | tar: Tar path traversal |
| x11-common | CVE-2023-5574 | LOW | 1:7.7+23ubuntu2 |  | xorg-x11-server: Use-after-free bug in DamageDestroy |
| xserver-common | CVE-2023-5574 | LOW | 2:21.1.4-2ubuntu1.7~22.04.16 |  | xorg-x11-server: Use-after-free bug in DamageDestroy |
| xvfb | CVE-2023-5574 | LOW | 2:21.1.4-2ubuntu1.7~22.04.16 |  | xorg-x11-server: Use-after-free bug in DamageDestroy |

---
## Image: Node.js

> Reference: `Node.js`
### Vulnerabilities
| Package | Vulnerability | Severity | Installed | Fixed | Title |
|---------|---------------|----------|-----------|-------|-------|
| js-yaml | CVE-2025-64718 | MEDIUM | 3.14.1 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 3.14.1 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 3.14.1 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 3.14.1 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 3.14.1 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 3.14.1 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 4.1.0 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| js-yaml | CVE-2025-64718 | MEDIUM | 4.1.0 | 4.1.1, 3.14.2 | js-yaml is a JavaScript YAML parser and dumper. In js-yaml 4.1.0 and b ... |
| micromatch | CVE-2024-4067 | MEDIUM | 2.3.11 | 4.0.8 | micromatch: vulnerable to Regular Expression Denial of Service |
| micromatch | CVE-2024-4067 | MEDIUM | 2.3.11 | 4.0.8 | micromatch: vulnerable to Regular Expression Denial of Service |
| micromatch | CVE-2024-4067 | MEDIUM | 3.1.10 | 4.0.8 | micromatch: vulnerable to Regular Expression Denial of Service |
| micromatch | CVE-2024-4067 | MEDIUM | 3.1.10 | 4.0.8 | micromatch: vulnerable to Regular Expression Denial of Service |
| micromatch | CVE-2024-4067 | MEDIUM | 3.1.10 | 4.0.8 | micromatch: vulnerable to Regular Expression Denial of Service |
| micromatch | CVE-2024-4067 | MEDIUM | 3.1.10 | 4.0.8 | micromatch: vulnerable to Regular Expression Denial of Service |
| node-forge | CVE-2025-12816 | HIGH | 1.3.1 | 1.3.2 | An interpretation-conflict (CWE-436) vulnerability in node-forge versi ... |
| node-forge | CVE-2025-12816 | HIGH | 1.3.1 | 1.3.2 | An interpretation-conflict (CWE-436) vulnerability in node-forge versi ... |
| node-forge | CVE-2025-66031 | HIGH | 1.3.1 | 1.3.2 | Forge (also called `node-forge`) is a native implementation of Transpo ... |
| node-forge | CVE-2025-66031 | HIGH | 1.3.1 | 1.3.2 | Forge (also called `node-forge`) is a native implementation of Transpo ... |
| node-forge | CVE-2025-66030 | MEDIUM | 1.3.1 | 1.3.2 | Forge (also called `node-forge`) is a native implementation of Transpo ... |
| node-forge | CVE-2025-66030 | MEDIUM | 1.3.1 | 1.3.2 | Forge (also called `node-forge`) is a native implementation of Transpo ... |
| utile | NSWG-ECO-445 | LOW | 0.2.1 |  | Out-of-bounds Read |
| utile | NSWG-ECO-445 | LOW | 0.2.1 |  | Out-of-bounds Read |

---
## Image: Python

> Reference: `Python`
### Vulnerabilities
| Package | Vulnerability | Severity | Installed | Fixed | Title |
|---------|---------------|----------|-----------|-------|-------|
| Flask-Cors | CVE-2024-6839 | MEDIUM | 4.0.2 | 6.0.0 | corydolphin/flask-cors version 4.0.1 contains an improper regex path m ... |
| Flask-Cors | CVE-2024-6839 | MEDIUM | 4.0.2 | 6.0.0 | corydolphin/flask-cors version 4.0.1 contains an improper regex path m ... |
| Flask-Cors | CVE-2024-6839 | MEDIUM | 4.0.2 | 6.0.0 | corydolphin/flask-cors version 4.0.1 contains an improper regex path m ... |
| Flask-Cors | CVE-2024-6844 | MEDIUM | 4.0.2 | 6.0.0 | A vulnerability in corydolphin/flask-cors version 4.0.1 allows for inc ... |
| Flask-Cors | CVE-2024-6844 | MEDIUM | 4.0.2 | 6.0.0 | A vulnerability in corydolphin/flask-cors version 4.0.1 allows for inc ... |
| Flask-Cors | CVE-2024-6844 | MEDIUM | 4.0.2 | 6.0.0 | A vulnerability in corydolphin/flask-cors version 4.0.1 allows for inc ... |
| Flask-Cors | CVE-2024-6866 | MEDIUM | 4.0.2 | 6.0.0 | corydolphin/flask-cors version 4.01 contains a vulnerability where the ... |
| Flask-Cors | CVE-2024-6866 | MEDIUM | 4.0.2 | 6.0.0 | corydolphin/flask-cors version 4.01 contains a vulnerability where the ... |
| Flask-Cors | CVE-2024-6866 | MEDIUM | 4.0.2 | 6.0.0 | corydolphin/flask-cors version 4.01 contains a vulnerability where the ... |
| certifi | CVE-2024-39689 | LOW | 2023.11.17 | 2024.7.4 | python-certifi: Remove root certificates from `GLOBALTRUST` from the root store |
| certifi | CVE-2024-39689 | LOW | 2023.11.17 | 2024.7.4 | python-certifi: Remove root certificates from `GLOBALTRUST` from the root store |
| certifi | CVE-2024-39689 | LOW | 2023.11.17 | 2024.7.4 | python-certifi: Remove root certificates from `GLOBALTRUST` from the root store |
| dnspython | CVE-2023-29483 | MEDIUM | 1.16.0 | 2.6.1 | dnspython: denial of service in stub resolver |
| dnspython | CVE-2023-29483 | MEDIUM | 1.16.0 | 2.6.1 | dnspython: denial of service in stub resolver |
| dnspython | CVE-2023-29483 | MEDIUM | 1.16.0 | 2.6.1 | dnspython: denial of service in stub resolver |
| pymongo | CVE-2024-5629 | MEDIUM | 3.12.0 | 4.6.3 | python-pymongo: Out-of-bounds read in bson module |
| pymongo | CVE-2024-5629 | MEDIUM | 3.12.0 | 4.6.3 | python-pymongo: Out-of-bounds read in bson module |
| pymongo | CVE-2024-5629 | MEDIUM | 3.12.0 | 4.6.3 | python-pymongo: Out-of-bounds read in bson module |
| requests | CVE-2024-35195 | MEDIUM | 2.31.0 | 2.32.0 | requests: subsequent requests to the same host ignore cert verification |
| requests | CVE-2024-35195 | MEDIUM | 2.31.0 | 2.32.0 | requests: subsequent requests to the same host ignore cert verification |
| requests | CVE-2024-35195 | MEDIUM | 2.31.0 | 2.32.0 | requests: subsequent requests to the same host ignore cert verification |
| requests | CVE-2024-47081 | MEDIUM | 2.31.0 | 2.32.4 | requests: Requests vulnerable to .netrc credentials leak via malicious URLs |
| requests | CVE-2024-47081 | MEDIUM | 2.31.0 | 2.32.4 | requests: Requests vulnerable to .netrc credentials leak via malicious URLs |
| requests | CVE-2024-47081 | MEDIUM | 2.31.0 | 2.32.4 | requests: Requests vulnerable to .netrc credentials leak via malicious URLs |

---


#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import glob

import xurl

def gen_db_cambridge():
    files = glob.glob('cambridge/*.html')
    for f in files:
        m = re.search(r'(<div class="entry">.*?)<div class="definition-src">', xurl.readLocal(f), re.DOTALL | re.MULTILINE)
        if m:
            out = f.replace('cambridge/', 'db/')
            txt = re.sub(r'<script.*?</script>', '', m.group(1), 0, re.DOTALL | re.MULTILINE)
            html = re.split('<!--result-->', xurl.readLocal('db.html'))
            xurl.saveLocal(out, '%s%s%s' %(html[0], txt, html[1]))
            print(out)
    return

if __name__ == '__main__':
    gen_db_cambridge()

---
path: "/blog/read-wave-file-header-with-rust"
date: "2019-12-28"
title: "Read WAVE file header with rust"
---

# How to Read Binary File Headers in Rust

This is a short demo on how to read binary data in Rust.

### First add required imports

<pre class="language-rust">
use std::env;
use std::fs::File;
use std::io::*;
use std::str;
</pre>

### Create a struct for the file header values WAV

This struct is created based on the canonical WAVE file format described [here](http://soundfile.sapp.org/doc/WaveFormat/).

<pre class="language-rust">
#[derive(Debug)]
struct WAVHeader<'a> {
    chunk_id: &'a str,
    chunk_size: u32,
    format: &'a str,
    subchunk1_id: &'a str,
    subchunk1_size: u32,
    audio_format: u32,
    num_channels: u32,
    sample_rate: u32,
    byte_rate: u32,
    block_align: u32,
    bits_per_sample: u32,
    subchunk2_id: &'a str,
    subchunk2_size: u32,
}
</pre>

### Declare helper function for reading little endian values

<pre class="language-rust">
fn read_as_little_endian(bytes: u8, values: &[u8]) -> u32 {
    let mut result: u32 = 0;

    for b in 0..bytes {
        result |= (values[b as usize] as u32) << 8 * b
    }

    result
}
</pre>

### Read and collect the value

<pre class="language-rust">
fn main() {
    let args: Vec<String> = env::args().collect();

    match args.len() {
        2 => println!("Read WAV file headers from: {}\n", &args[1]),
        _ => panic!("Wrong amount of args"),
    };

    let filename = &args[1];

    let mut f = File::open(filename).unwrap();
    let mut buffer: [u8; 44] = [0; 44];

    f.read(&mut buffer).unwrap();

    let header = WAVHeader {
        chunk_id: str::from_utf8(&buffer[0..4]).unwrap(),
        chunk_size: read_as_little_endian(4, &buffer[4..8]) + 8,
        format: str::from_utf8(&buffer[8..12]).unwrap(),
        subchunk1_id: str::from_utf8(&buffer[12..16]).unwrap(),
        subchunk1_size: read_as_little_endian(4, &buffer[16..20]),
        audio_format: read_as_little_endian(2, &buffer[20..22]),
        num_channels: read_as_little_endian(2, &buffer[22..24]),
        sample_rate: read_as_little_endian(2, &buffer[24..28]),
        byte_rate: read_as_little_endian(4, &buffer[28..32]),
        block_align: read_as_little_endian(2, &buffer[32..34]),
        bits_per_sample: read_as_little_endian(2, &buffer[34..36]),
        subchunk2_id: str::from_utf8(&buffer[36..40]).unwrap(),
        subchunk2_size: read_as_little_endian(2, &buffer[40..44]),
    };

    // pretty print the struct
    println!("{:#?}", header);
}
</pre>

Based on this little experimentation with rust, I learned
that rust reads binary data as unsigned integers `u8` that
will act as basic blocks that need to be encoded based on the
specification.

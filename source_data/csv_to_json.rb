#!/usr/bin/env ruby

require 'csv'
require 'json'

IN_FILE = ARGV.shift
OUT_FILE = ARGV.shift

csv_data = CSV.open(IN_FILE)
headers = csv_data.shift.map {|i| i.to_s }
string_data = csv_data.map {|row| row.map {|cell| cell.to_s } }
array_of_hashes = string_data.map {|row| Hash[*headers.zip(row).flatten] }
output_json = JSON.pretty_generate(array_of_hashes)

if OUT_FILE.nil?
  puts output_json
else
  File.open(OUT_FILE, "w") { |file| file.puts output_json }
end

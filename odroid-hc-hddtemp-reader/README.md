# hddtemp daemon reader for HARDKERNEL ODROID HC1 and HC2

For some reason these devices present the hddtemp output with a lot of garbage. This script outputs only the temperature value. Also it fails to output anything form time to time, but a simple retry can fix that too.

Can be helpful for monitoring or data collection tools that can run shell commands (Home Assistant or openHAB)

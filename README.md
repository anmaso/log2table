# log2table

Simple utility to extract a table of values from a log file

You can use regular expressions to extract the data from the lines of the log

- Define the "record match separator" 
- Define rules to extract each column 

Rules are converted to regular expression
```
new RegExp(rule)
```

Lines will be consumed rule by rule
- If rule matches, go to next line and next rule
- Unless you mark rule as "false", then you can use following rule to extract another value on the same line

Mark a rule as optional if it can appear on the line can appear or not.

Capture will be translated to Javascript RegExp capture groups, it's the data you want to show up on the table

```
new RegExp( "("+rule+")")
```

The first capture group is used for the table value

You can save your rules with "rules to clipboard"
Load rules from text area with "Load text as rules"
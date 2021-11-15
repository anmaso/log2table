const lineMatch = (line, match) => line.match(new RegExp(match));
const lineCapture = (line, capture) => {
  try {
    const group = line.match(new RegExp("(" + capture + ")"));
    console.log(
      "line=" + line,
      capture,
      group,
      "->",
      (group && group[1]) || ""
    );
    return (group && group[1]) || "";
  } catch (e) {
    console.error(e);
  }
  return "";
};

const getRecords = (logtext, startline) => {
  const rg_line = new RegExp(startline);
  const records = [];
  let record = [];
  logtext.split("\n").forEach(line => {
    if (line.match(rg_line)) {
      if (record.length) {
        records.push(record);
      }
      record = [];
    }
    record.push(line);
  });
  if (record.length) {
    records.push(record);
  }
  return records;
};

const getData = (rules, text, startline) => {
  const data = [];
  const records = getRecords(text, startline);
  records.forEach(r => {
    var line_index = 0;
    var rule_index = 0;
    var linedata = [];
    var rules_optional_matches=[];
    var rules_optional_last=0;
    while (line_index < r.length && rule_index < rules.length) {
      const line = r[line_index];
      const rules_optional = [];
      console.log(line_index, "rule", rule_index, line);
      var rule = rules[rule_index];
      while (rule.optional) {
        rules_optional.push(rule);
        rule = rules[rule_index+rules_optional.length];
      }
      rules_optional_matches.length=rules_optional.length;
      
      console.log("rules_optional", rules_optional)
      for(var i=rules_optional_last;i<rules_optional.length;i++){
        console.log("cheking optional")
        if (lineMatch(line, rules_optional[i].match)){
          rules_optional_matches[i]=lineCapture(line, rules_optional[i].capture);
          rules_optional_last=i;
        }
      }
      
      if (lineMatch(line, rule.match)) {
        linedata = linedata.concat(rules_optional_matches);
        linedata.push(lineCapture(line, rule.capture));
        if (rule.advance) {
          line_index++;
        }
        
        rule_index=rule_index+1+rules_optional.length;
        rules_optional_matches=[];
        rules_optional_last=0;
      } else {
        line_index++;
      }
    }
    data.push(linedata);
  });
  return data;
};

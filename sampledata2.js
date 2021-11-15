window.SAMPLE={
  textarea:`record number 1

some data not interesting
some data not interesting
...
interesting line with one value: 345
some data not interesting
this is optional 777
some data not interesting
interesting line with two values: 123, 456

record number 2 

some data not interesting
some data not interesting
...
interesting line with one value: 999
some data not interesting
some data not interesting
interesting line with two values: 333, 444`,
  rules:[
    {
          name: "record",
          advance: true,
          match: "record",
          capture: "\\d+"
        },
    {
          name: "column1",
          advance: true,
          match: "with one",
          capture: "\\d+"
        },
        {
          name: "optional",
          advance: true,
          optional: true,
          match: "optional",
          capture: "\\d+"
        },{
          name: "column2",
          advance: false,
          match: "with two",
          capture: "\\d+"
        },{
          name: "column3",
          advance: true,
          match: "with two",
          capture: "\\d+$"
        }
  ],
  sample:'interesting line with one value: 345',
  regexp:'\\d+',
  startline:'^record'
}
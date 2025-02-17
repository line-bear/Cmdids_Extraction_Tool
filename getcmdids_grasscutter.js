function getCmdids() {
    const fs = require('fs');
    const protoPath = './proto/';
    console.log('Found proto files.Please wait...');
    const protoFiles = fs.readdirSync(protoPath);
    let protoStr = '';
    protoFiles.forEach(file => {
      const content = fs.readFileSync(protoPath + file, 'utf-8');
      const cmdId = content.match(/CMD_ID = (\d+);/);
      if (cmdId) {
        protoStr += `public static final int ${file.replace('.proto', '')} = ${cmdId[1]};\n`;
      }
    })
    fs.writeFileSync('./PacketOpcodes.java', 'package emu.grasscutter.net.packet;\nimport java.util.Arrays;\nimport java.util.HashSet;\nimport java.util.List;\npublic class PacketOpcodes {\n    public static final int NONE = 0;\n\n','utf-8');
    fs.appendFileSync('./PacketOpcodes.java', protoStr,'utf-8');
    const appendFileContent = "\npublic static final HashSet<Integer> BANNED_PACKETS = new HashSet<Integer>() {{\n    add(PacketOpcodes.WindSeedClientNotify);\n    add(PacketOpcodes.PlayerLuaShellNotify);\n    }};\n}\n";
    fs.appendFileSync('./PacketOpcodes.java', appendFileContent, 'utf-8');
  }
  getCmdids();
  console.log('done!Please check the ./PacketOpcodes.java file.');

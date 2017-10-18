function drawSetings(id) {
  var content = document.querySelector('#content');

  content.innerHTML = '<div id="setings"><br><form action="#"><input type="checkbox"> возможность перелистывать месяц <br><br><input type="checkbox"> возможность добавлять заметки <br><br><input type="checkbox"> возможность удалять заметки <br><br>Показать определённый месяц и год <br><br><select name="month" id="selectedMonth"> месяц <option value="1">январь</option><option value="2">февраль</option><option value="3">март</option><option value="4">апрель</option>      <option value="5">май</option><option value="6">июнь</option><option value="7">июль</option>      <option value="8">август</option><option value="9">сентябрь</option><option value="10">октябрь</option><option value="11">ноябрь</option><option value="12">декабрь</option>    </select><input type="text"> год</form> <br><br></div><div id="code"><textarea name="code" id="text_code" cols="40" rows="30"></textarea></div><div id="preview"></div>'
}
/*
drawSetings('#content');
*/
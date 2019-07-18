export default class DateFunctions {
    getMessageTime(date) {
        const diff = new Date() - date; 
        const sec = this.getSeconds(diff); 
        
        if (sec < 60) {
          return 'just now';
        }
        
        const min = this.getMinutes(diff); 
      
        if (min < 60) {
          return min + ' minutes ago';
        }
        
        return 'was on ' + this.getMonthAndDay(date);
      }
    
    getSeconds(n) {
        return Math.floor(n / 1000);
    }
  
    getMinutes(n) {
        return Math.floor(n / 60000);
    }
  
    formatDateForMessage(date) {
        let d = date;
         d = [
        '' + d.getFullYear(),
        '0' + (d.getMonth() + 1),
        '0' + d.getDate(),
        '0' + d.getHours(),
        '0' + d.getMinutes(),
        '0' + d.getSeconds()
        ];
      
        for (let i = 1; i < d.length; i++) {
          d[i] = d[i].slice(-2);
        }
      
        return d.slice(0, 3).join('-') + ' ' + d.slice(3).join(':');
    } 
  
    getMonthAndDay(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
      
        return monthNames[monthIndex] + ' ' + day;
    }
  
    isEqual(a, b) {
        return a.getDate() === b.getDate() && a.getMonth() === b.getMonth();
    }
}
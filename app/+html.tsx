import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{
          __html: `
            var BASE_URL = 'http://172.16.143.5:3000/api';
            var lastAlertIds = [];

            (function() {
              var user = localStorage.getItem('user');
              if (user) {
                try {
                  var parsed = JSON.parse(user);
                  window.__senderRole = parsed.role || 'student';
                  window.__userId = parsed.id || 0;
                } catch(e) { window.__senderRole = 'student'; window.__userId = 0; }
              } else {
                window.__senderRole = 'student';
                window.__userId = 0;
              }
              var params = new URLSearchParams(window.location.search);
              var alertId = params.get('alertId');
              if (alertId) window.__alertId = alertId;
            })();

            function playNormalAlert() {
              try {
                var ctx = new (window.AudioContext || window.webkitAudioContext)();
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.5);
              } catch(e) { console.log('Audio not supported'); }
            }

            function playEmergencyAlert() {
              try {
                var ctx = new (window.AudioContext || window.webkitAudioContext)();
                var times = [0, 0.3, 0.6, 0.9, 1.2];
                times.forEach(function(t) {
                  var osc = ctx.createOscillator();
                  var gain = ctx.createGain();
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  osc.frequency.setValueAtTime(1200, ctx.currentTime + t);
                  osc.frequency.setValueAtTime(800, ctx.currentTime + t + 0.15);
                  gain.gain.setValueAtTime(0.5, ctx.currentTime + t);
                  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.28);
                  osc.start(ctx.currentTime + t);
                  osc.stop(ctx.currentTime + t + 0.28);
                });
              } catch(e) { console.log('Audio not supported'); }
            }

            function handleLogin() {
              var emailEl = document.getElementById('login-email');
              var passwordEl = document.getElementById('login-password');
              if (!emailEl || !passwordEl) { alert('Form not ready'); return; }
              var email = emailEl.value;
              var password = passwordEl.value;
              if (!email || !password) { alert('Please fill in all fields'); return; }
              fetch(BASE_URL + '/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
              })
              .then(function(r) { return r.json(); })
              .then(function(result) {
                if (!result.success) { alert(result.error || 'Invalid credentials'); return; }
                localStorage.setItem('user', JSON.stringify(result));
                if (result.role === 'student') window.location.href = '/(app)/Student';
                else if (result.role === 'staff') window.location.href = '/(app)/Staff';
                else if (result.role === 'nurse') window.location.href = '/(app)/dashboardscreen';
              })
              .catch(function() { alert('Cannot connect to server.'); });
            }

            function handleRegister() {
              var nameEl = document.getElementById('reg-name');
              var emailEl = document.getElementById('reg-email');
              var passwordEl = document.getElementById('reg-password');
              var roleEl = document.getElementById('reg-role');
              if (!nameEl || !emailEl || !passwordEl) { alert('Form not ready'); return; }
              var name = nameEl.value;
              var email = emailEl.value;
              var password = passwordEl.value;
              var role = roleEl ? roleEl.value : 'student';
              if (!name || !email || !password) { alert('Please fill in all fields'); return; }
              if (password.length < 6) { alert('Password must be at least 6 characters'); return; }
              fetch(BASE_URL + '/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password, role: role })
              })
              .then(function(r) { return r.json(); })
              .then(function(result) {
                if (result.success) {
                  alert('Account created! Please login.');
                  window.location.href = '/(auth)/loginscreen';
                } else {
                  alert(result.error || 'Registration failed');
                }
              })
              .catch(function() { alert('Cannot connect to server.'); });
            }

            function selectRole(role) {
              var roleEl = document.getElementById('reg-role');
              if (roleEl) roleEl.value = role;
              var roles = ['student', 'staff', 'nurse'];
              var colors = { student: '#10B981', staff: '#3B82F6', nurse: '#6366F1' };
              var labels = { student: 'Student', staff: 'Staff', nurse: 'Nurse' };
              roles.forEach(function(r) {
                var el = document.getElementById('role-' + r);
                if (el) {
                  if (r === role) {
                    el.style.backgroundColor = colors[r];
                    el.style.borderColor = colors[r];
                    el.style.color = '#fff';
                    el.textContent = labels[r] + ' ✓';
                  } else {
                    el.style.backgroundColor = '#fff';
                    el.style.borderColor = '#ddd';
                    el.style.color = '#64748B';
                    el.textContent = labels[r];
                  }
                }
              });
            }

            function sendStudentAlert() {
              var name = document.getElementById('st-name').value;
              var age = document.getElementById('st-age').value;
              var grade = document.getElementById('st-grade').value;
              var room = document.getElementById('st-room').value;
              var symptoms = document.getElementById('st-symptoms').value;
              var urgency = document.getElementById('st-urgency').value;
              if (!name || !symptoms) { alert('Please fill in Patient Name and Medical Attention Needed.'); return; }
              var ageNum = parseInt(age);
              if (!age || isNaN(ageNum) || ageNum < 15 || ageNum > 20) { alert('Age must be between 15 and 20 years old.'); return; }
              var btn = document.getElementById('send-alert-btn');
              if (btn) btn.textContent = 'Sending...';
              fetch(BASE_URL + '/send_alert.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientName: name, age: ageNum, gradeLevel: grade, roomLocation: room, symptomDescription: symptoms, urgencyLevel: urgency, userId: window.__userId })
              })
              .then(function(r) { return r.json(); })
              .then(function(result) {
                if (result.success) {
                  alert('Alert sent! Your medical alert has been sent to the nurse and staff.');
                  document.getElementById('st-name').value = '';
                  document.getElementById('st-age').value = '';
                  document.getElementById('st-room').value = '';
                  document.getElementById('st-symptoms').value = '';
                  document.getElementById('st-grade').value = 'Grade 11';
                  document.getElementById('st-urgency').value = 'Level 1';
                } else {
                  alert('Error: ' + (result.error || 'Failed to send alert'));
                }
                if (btn) btn.textContent = 'Send Medical Alert';
              })
              .catch(function() {
                alert('Cannot connect to server.');
                if (btn) btn.textContent = 'Send Medical Alert';
              });
            }

            function deleteAlert(id) {
              if (!confirm('Remove this alert from dashboard?')) return;
              fetch(BASE_URL + '/delete_alert.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
              })
              .then(function(r) { return r.json(); })
              .then(function(result) {
                if (result.success) loadAlerts();
                else alert('Failed to remove alert');
              })
              .catch(function() { alert('Cannot connect to server.'); });
            }

            function urgencyColor(level) {
              if (level === 'Level 3') return '#D32F2F';
              if (level === 'Level 2') return '#FF9800';
              return '#4CAF50';
            }

            function loadAlerts() {
              fetch(BASE_URL + '/get_alerts.php')
                .then(function(r) { return r.json(); })
                .then(function(result) {
                  if (result.success) {
                    var newIds = result.alerts.map(function(a) { return a.id; });
                    var hasNew = false;
                    var hasEmergency = false;
                    newIds.forEach(function(id) {
                      if (lastAlertIds.indexOf(id) === -1 && lastAlertIds.length > 0) {
                        hasNew = true;
                        var found = result.alerts.find(function(a) { return a.id === id; });
                        if (found && found.urgency_level === 'Level 3') hasEmergency = true;
                      }
                    });
                    if (hasNew) {
                      if (hasEmergency) playEmergencyAlert();
                      else playNormalAlert();
                    }
                    lastAlertIds = newIds;
                    renderAlerts(result.alerts);
                  }
                })
                .catch(function() { console.log('Cannot connect'); });
            }

            function renderAlerts(alerts) {
              var container = document.getElementById('alerts-container');
              if (!container) return;
              var newCount = alerts.filter(function(a) { return a.status === 'pending'; }).length;
              var badge = document.getElementById('new-badge');
              if (badge) badge.textContent = newCount > 0 ? 'New ' + newCount + ' alert' + (newCount > 1 ? 's' : '') : '';
              if (alerts.length === 0) {
                container.innerHTML = '<p style="text-align:center;color:#aaa;font-size:18px;padding:40px">No alerts yet.</p>';
                return;
              }
              container.innerHTML = alerts.map(function(item) {
                var color = urgencyColor(item.urgency_level);
                var status = item.status === 'pending' ? 'Unread' : item.status === 'viewed' ? 'Viewed' : 'Resolved';
                return '<div style="background:#fff;padding:15px;margin:10px;border-radius:12px;border-left:5px solid ' + color + ';box-shadow:0 1px 3px rgba(0,0,0,0.1)">' +
                  '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">' +
                  '<div><div style="font-size:17px;font-weight:bold;color:#1E293B">' + item.patient_name + '</div>' +
                  '<div style="font-size:12px;color:#64748B;margin-top:2px">' + item.grade_level + ' - Room ' + item.room_location + ' - Age ' + item.age + '</div></div>' +
                  '<div style="background:' + color + ';color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:bold">' + item.urgency_level + '</div>' +
                  '</div>' +
                  '<div style="font-size:14px;color:#334155;margin-bottom:12px">' + item.symptom_description + '</div>' +
                  '<div style="display:flex;justify-content:space-between;align-items:center">' +
                  '<span style="font-size:12px;color:#64748B">' + status + '</span>' +
                  '<div style="display:flex;gap:8px">' +
                  '<div data-id="' + item.id + '" data-name="' + item.patient_name + '" class="chat-btn" style="background:#1a73e8;color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-weight:bold;font-size:13px">Chat</div>' +
                  '<div data-id="' + item.id + '" class="delete-btn" style="background:#ff4d4d;color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-weight:bold;font-size:13px">Done</div>' +
                  '</div></div></div>';
              }).join('');
            }

            function loadStudentAlerts() {
              var userId = window.__userId;
              fetch(BASE_URL + '/get_alerts.php?userId=' + userId)
                .then(function(r) { return r.json(); })
                .then(function(result) {
                  if (result.success) renderStudentAlerts(result.alerts);
                })
                .catch(function() { console.log('Cannot connect'); });
            }

            function renderStudentAlerts(alerts) {
              var container = document.getElementById('student-alerts-container');
              if (!container) return;
              if (alerts.length === 0) {
                container.innerHTML = '<p style="text-align:center;color:#aaa;font-size:18px;padding:40px">No alerts sent yet.</p>';
                return;
              }
              container.innerHTML = alerts.map(function(item) {
                var color = urgencyColor(item.urgency_level);
                var status = item.status === 'pending' ? 'Unread' : item.status === 'viewed' ? 'Viewed' : 'Resolved';
                var chatBtn = item.hidden_staff == 1
                  ? '<div style="background:#aaa;color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:bold">Chat Closed</div>'
                  : '<div data-id="' + item.id + '" data-name="' + item.patient_name + '" class="chat-btn" style="background:#1a73e8;color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-weight:bold;font-size:13px">Chat</div>';
                return '<div style="background:#fff;padding:15px;margin:10px;border-radius:12px;border-left:5px solid ' + color + ';box-shadow:0 1px 3px rgba(0,0,0,0.1)">' +
                  '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">' +
                  '<div><div style="font-size:17px;font-weight:bold;color:#1E293B">' + item.patient_name + '</div>' +
                  '<div style="font-size:12px;color:#64748B;margin-top:2px">' + item.grade_level + ' - Room ' + item.room_location + '</div></div>' +
                  '<div style="background:' + color + ';color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:bold">' + item.urgency_level + '</div>' +
                  '</div>' +
                  '<div style="font-size:14px;color:#334155;margin-bottom:12px">' + item.symptom_description + '</div>' +
                  '<div style="display:flex;justify-content:space-between;align-items:center">' +
                  '<span style="font-size:12px;color:#64748B">Status: ' + status + '</span>' +
                  chatBtn +
                  '</div></div>';
              }).join('');
            }

            function openChat(alertId, studentName) {
              fetch(BASE_URL + '/update_status.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: alertId, status: 'viewed' })
              });
              window.location.href = '/(app)/chatscreen?alertId=' + alertId + '&studentName=' + encodeURIComponent(studentName);
            }

            function loadMessages() {
              var alertId = window.__alertId;
              if (!alertId) return;
              fetch(BASE_URL + '/get_messages.php?alertId=' + alertId)
                .then(function(r) { return r.json(); })
                .then(function(result) {
                  if (result.success) renderMessages(result.messages);
                })
                .catch(function() { console.log('Cannot connect'); });
            }

            function renderMessages(messages) {
              var container = document.getElementById('messages-container');
              if (!container) return;
              var myRole = window.__senderRole || 'student';
              var wasAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
              if (messages.length === 0) {
                container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px">No messages yet. Start the conversation!</p>';
                return;
              }
              container.innerHTML = messages.map(function(msg) {
                var isMe = msg.sender_role === myRole;
                var roleLabel = msg.sender_role.charAt(0).toUpperCase() + msg.sender_role.slice(1);
                var senderLabel = isMe ? 'You (' + roleLabel + ')' : roleLabel;
                return '<div style="display:flex;flex-direction:column;align-items:' + (isMe ? 'flex-end' : 'flex-start') + ';margin-bottom:10px">' +
                  '<div style="background:' + (isMe ? '#1a73e8' : '#e0e0e0') + ';color:' + (isMe ? '#fff' : '#333') + ';padding:12px;border-radius:20px;max-width:80%">' +
                  '<div style="font-size:10px;color:' + (isMe ? 'rgba(255,255,255,0.6)' : '#999') + ';margin-bottom:3px">' + senderLabel + '</div>' +
                  '<div style="font-size:15px">' + msg.message + '</div>' +
                  '</div></div>';
              }).join('');
              if (wasAtBottom) container.scrollTop = container.scrollHeight;
            }

            function sendChatMessage() {
              var input = document.getElementById('msg-input');
              if (!input || !input.value.trim()) return;
              var text = input.value.trim();
              input.value = '';
              fetch(BASE_URL + '/send_message.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alertId: window.__alertId, senderRole: window.__senderRole, message: text })
              })
              .then(function() { loadMessages(); })
              .catch(function() { alert('Cannot connect to server.'); });
            }

            function handleLogout() {
              localStorage.removeItem('user');
              window.location.href = '/';
            }

            document.addEventListener('click', function(e) {
              var target = e.target;
              if (target && target.classList) {
                if (target.classList.contains('chat-btn')) {
                  var id = target.getAttribute('data-id');
                  var name = target.getAttribute('data-name');
                  openChat(id, name);
                }
                if (target.classList.contains('delete-btn')) {
                  var id = target.getAttribute('data-id');
                  deleteAlert(id);
                }
              }
            });

            function attachListeners() {
              var loginBtn = document.getElementById('login-btn');
              if (loginBtn) loginBtn.onclick = handleLogin;

              var regBtn = document.getElementById('reg-btn');
              if (regBtn) regBtn.onclick = handleRegister;

              var sendAlertBtn = document.getElementById('send-alert-btn');
              if (sendAlertBtn) sendAlertBtn.onclick = sendStudentAlert;

              var logoutBtn = document.getElementById('logout-btn');
              if (logoutBtn) logoutBtn.onclick = handleLogout;

              var viewChatsBtn = document.getElementById('view-chats-btn');
              if (viewChatsBtn) {
                viewChatsBtn.onclick = function() {
                  window.location.href = '/(app)/studentalerts';
                };
              }

              var roles = ['student', 'staff', 'nurse'];
              roles.forEach(function(r) {
                var el = document.getElementById('role-' + r);
                if (el) el.onclick = function() { selectRole(r); };
              });

              var alertsContainer = document.getElementById('alerts-container');
              if (alertsContainer) {
                alertsContainer.style.overflowY = 'auto';
                alertsContainer.style.maxHeight = 'calc(100vh - 120px)';
                loadAlerts();
                if (!window.__alertsInterval) {
                  window.__alertsInterval = setInterval(loadAlerts, 5000);
                }
              }

              var studentAlertsContainer = document.getElementById('student-alerts-container');
              if (studentAlertsContainer) {
                studentAlertsContainer.style.overflowY = 'auto';
                studentAlertsContainer.style.maxHeight = 'calc(100vh - 80px)';
                loadStudentAlerts();
                if (!window.__studentAlertsInterval) {
                  window.__studentAlertsInterval = setInterval(loadStudentAlerts, 5000);
                }
                var saBackBtn = document.getElementById('back-btn');
                if (saBackBtn) saBackBtn.onclick = function() { window.history.back(); };
              }

              var messagesContainer = document.getElementById('messages-container');
              if (messagesContainer) {
                var params = new URLSearchParams(window.location.search);
                var alertId = params.get('alertId');
                var studentName = params.get('studentName') || 'Student';
                window.__alertId = alertId;

                var titleEl = document.getElementById('chat-title');
                if (titleEl) {
                  if (window.__senderRole === 'student') {
                    titleEl.textContent = 'Chat with Nurse/Staff';
                  } else {
                    titleEl.textContent = decodeURIComponent(studentName);
                  }
                }

                loadMessages();
                if (!window.__chatInterval) {
                  window.__chatInterval = setInterval(loadMessages, 3000);
                }

                var sendBtn = document.getElementById('send-btn');
                if (sendBtn) sendBtn.onclick = sendChatMessage;

                var msgInput = document.getElementById('msg-input');
                if (msgInput) {
                  msgInput.onkeydown = function(e) {
                    if (e.key === 'Enter') sendChatMessage();
                  };
                }

                var backBtn = document.getElementById('back-btn');
                if (backBtn) backBtn.onclick = function() { window.history.back(); };
              }
            }

            document.addEventListener('DOMContentLoaded', attachListeners);
            setTimeout(attachListeners, 500);
            setTimeout(attachListeners, 1000);
            setTimeout(attachListeners, 2000);
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
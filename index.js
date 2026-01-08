    // Gọi hàm tải component
    loadComponent('header_placeholder', 'header.html');
    loadComponent('footer_placeholder', 'footer.html');
    
    // Hàm tải component (header/footer)
    function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
        document.getElementById(id).innerHTML = data;
        
        // Nếu là header thì kích hoạt lại sự kiện cho nút theme
        if (id === 'header_placeholder') {
            const themeBtn = document.getElementById('theme_toggle');
            if(themeBtn) {
                themeBtn.addEventListener('click', () => {
                    document.body.classList.toggle('light_mode');
                });
            }

            // --- Thêm logic cho Hamburger Menu ---
            const navContainer = document.querySelector('.nav_container');
            if (navContainer) {
                // Tạo nút hamburger
                const hamburger = document.createElement('div');
                hamburger.className = 'hamburger';
                hamburger.innerHTML = '<span></span><span></span><span></span>';
                
                // Thêm vào nav_container
                navContainer.appendChild(hamburger);

                // Xử lý sự kiện click
                hamburger.addEventListener('click', function() {
                    this.classList.toggle('active'); // Animation icon
                    navContainer.classList.toggle('active'); // Mở/đóng menu
                });
            }
            // -------------------------------------

            // Xử lý active state cho nav items
            const navItems = document.querySelectorAll('.nav_item');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Bỏ active của tất cả các item khác
                    navItems.forEach(nav => nav.classList.remove('active'));
                    // Thêm active cho item vừa bấm
                    this.classList.add('active');
                });
            });

            // Xử lý scroll cho các mục nav
            const navAbout = document.getElementById('nav_about');
            const navProject = document.getElementById('nav_project');
            const navHome = document.getElementById('nav_home');
            const navContact = document.getElementById('nav_contact');


            if (navAbout) {
                navAbout.addEventListener('click', () => document.querySelector('.about_section').scrollIntoView({ behavior: 'smooth' }));
            }
            
            if (navProject) {
                navProject.addEventListener('click', () => document.querySelector('.projects_section').scrollIntoView({ behavior: 'smooth' }));
            }
            
            if (navHome) {
                navHome.addEventListener('click', () => document.querySelector('.home_section').scrollIntoView({ behavior: 'smooth' }));
            }

            if (navContact) {
                navContact.addEventListener('click', () => document.querySelector('.contact_section').scrollIntoView({ behavior: 'smooth' }));
            }                
        }
        })
        .catch(error => console.error('Error loading component:', error));
    }


    // --- Logic cho Tab About/Skills ---
    const tabAbout = document.getElementById('tab_about');
    const tabSkills = document.getElementById('tab_skills');
    const contentAbout = document.getElementById('about_text_content');
    const contentSkills = document.getElementById('skills_content');
    if (tabAbout && tabSkills && contentAbout && contentSkills) {
        tabAbout.addEventListener('click', () => {
            tabAbout.classList.add('active');
            tabSkills.classList.remove('active');
            contentAbout.style.display = 'block';
            contentSkills.style.display = 'none';
            
            // Reset và chạy lại animation cho About
            contentAbout.classList.remove('animate_active');
            void contentAbout.offsetWidth; // Trigger reflow
            contentAbout.classList.add('animate_active');
        });
        tabSkills.addEventListener('click', () => {
            tabSkills.classList.add('active');
            tabAbout.classList.remove('active');
            contentAbout.style.display = 'none';
            contentSkills.style.display = 'flex';

            // Reset và chạy lại animation cho Skills
            contentSkills.classList.remove('animate_active');
            void contentSkills.offsetWidth;
            contentSkills.classList.add('animate_active');
        });
    }

    // --- Logic cho Skill Items (Hover/Click) ---
    const skillItems = document.querySelectorAll('.skill_item');
    const skillText = document.getElementById('skill_text');

    if (skillItems.length > 0 && skillText) {
        const setActiveSkill = (index) => {
            skillItems.forEach(item => item.classList.remove('active'));
            skillItems[index].classList.add('active');
            const desc = skillItems[index].querySelector('.skill_desc_hidden').innerText;
            
            // Reset và chạy animation cho text mô tả
            skillText.classList.remove('skill_text_anime');
            void skillText.offsetWidth; // Trigger reflow
            skillText.innerText = desc;
            skillText.classList.add('skill_text_anime');
        };

        skillItems.forEach((item, index) => {
            item.addEventListener('click', () => setActiveSkill(index));
        });

        // Mặc định active cái đầu tiên
        setActiveSkill(0);
    }
    

      // Tạo hiệu ứng kẻ sọc (Rising Stripes) bằng JS
        const wavesContainer = document.querySelector('.music-waves');
      if (wavesContainer) {
        const stripeCount = 40; // Tăng số lượng sọc lên 40
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];

        for (let i = 0; i < stripeCount; i++) {
          const span = document.createElement('span');
          
          // Random các thuộc tính
          const left = Math.random() * 100; // Vị trí ngẫu nhiên 0-100%
          const height = Math.random() * 20 + 10; // Giảm chiều dài: random từ 10vh đến 30vh
          const duration = Math.random() * 3 + 2; // Tốc độ ngẫu nhiên (2s - 5s)
          const delay = Math.random() * 5; // Độ trễ
          const color = colors[Math.floor(Math.random() * colors.length)]; // Màu ngẫu nhiên

          // Gán style inline
          span.style.left = `${left}%`;
          span.style.height = `${height}vh`;
          span.style.animationDuration = `${duration}s`;
          span.style.animationDelay = `${delay}s`;
          span.style.background = `linear-gradient(to top, transparent, ${color}, transparent)`;

          wavesContainer.appendChild(span);
        }
      }


      // Effect font Cyberpunk
      // Map ký tự sang số theo yêu cầu
      const charMap = {
        'e': '3', 'E': '3',
        'o': '0', 'O': '0',
        'y': '2', 'Y': '2',
        'i': '1', 'I': '1'
      };
      const targetLetters = Object.keys(charMap);

      // Hàm chạy hiệu ứng cho 1 đối tượng cụ thể
      const runHackerEffect = (element, mode = 'decode') => {
        let iteration = 0;
        const originalText = element.dataset.value; // Lấy chữ gốc từ data-value
        
        // Dừng interval cũ nếu đang chạy (để tránh lỗi khi rê chuột nhanh)
        if (element.interval) clearInterval(element.interval);
        
        element.interval = setInterval(() => {
          element.innerText = originalText
            .split("")
            .map((letter, index) => {
              // Nếu ký tự không nằm trong danh sách targetLetters thì giữ nguyên
              if (!targetLetters.includes(letter)) {
                return letter;
              }

              const hackedChar = charMap[letter];

              if (mode === 'encode') {
                 // Hover vào: Chữ -> Số (từ trái sang phải)
                 if (index < iteration) return hackedChar;
                 return letter;
              } else {
                 // Hover ra (hoặc load): Số -> Chữ (từ trái sang phải)
                 if (index < iteration) return letter;
                 return hackedChar;
              }
            })
            .join("");
          
          if(iteration >= originalText.length){ 
            clearInterval(element.interval);
          }
          
          iteration += 1 / 3;
        }, 30);
      }

      // Lấy danh sách các từ cần đổi hiệu ứng
      const words = document.querySelectorAll(".glitch_word");
      // 1. Chạy ngay khi load trang (Hiệu ứng giải mã: Số -> Chữ)
      words.forEach(word => runHackerEffect(word, 'decode'));
      // 2. Chạy lại khi di chuột vào cả khối cha
      const container = document.querySelector(".hero_text");
      if (container) {
        container.onmouseenter = () => {
            words.forEach(word => {
                runHackerEffect(word, 'encode');
            });
        };
        container.onmouseleave = () => {
            words.forEach(word => {
                runHackerEffect(word, 'decode');
            });
        };
      }


      // --- Hiệu ứng scroll slide Animation Home Section ---
      const homeSection = document.querySelector('.home_section');
      const animatedElements = document.querySelectorAll('.hero_avatar, .hero_text, .hero_sub_text, .sub_hero_text');

      if (homeSection && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {  
                if (entry.isIntersecting) {
                    // Khi home section xuất hiện -> Thêm class để chạy animation
                    animatedElements.forEach(el => el.classList.add('animate_active'));
                } else {
                    // Khi home section biến mất -> Xóa class để reset animation
                    animatedElements.forEach(el => el.classList.remove('animate_active'));
                }
            });
        }, {
            threshold: 0.1 // Kích hoạt khi thấy 10% home section
        });

        observer.observe(homeSection);
      }

      // --- Hiệu ứng scroll slide Animation About Section ---
      const aboutSection = document.querySelector('.about_section');
      const aboutAnimatedElements = document.querySelectorAll('.about_content, .skills');

      if (aboutSection && aboutAnimatedElements.length > 0) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutAnimatedElements.forEach(el => el.classList.add('animate_active'));
                } else {
                    aboutAnimatedElements.forEach(el => el.classList.remove('animate_active'));
                }
            });
        }, { threshold: 0.1 });

        aboutObserver.observe(aboutSection);
      }

    // --- Hiệu ứng scroll slide Animation Project Section ---
      const projectSection = document.querySelector('.projects_section');
      const projectAnimatedElements = document.querySelectorAll('.project_title, .projects_container');

      if (projectSection && projectAnimatedElements.length > 0) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectAnimatedElements.forEach(el => el.classList.add('animate_slide_up'));
                } else {
                    projectAnimatedElements.forEach(el => el.classList.remove('animate_slide_up'));
                }
            });
        }, { threshold: 0.1 });

        projectObserver.observe(projectSection);
      }

      // --- Hiệu ứng scroll slide Animation Media Section ---
      const mediaSection = document.querySelector('.media_section');
      const mediaAnimatedElements = document.querySelectorAll('.media_title, .media_container');

      if (mediaSection && mediaAnimatedElements.length > 0) {
        const mediaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mediaAnimatedElements.forEach(el => el.classList.add('animate_slide_up'));
                } else {
                    mediaAnimatedElements.forEach(el => el.classList.remove('animate_slide_up'));
                }
            });
        }, { threshold: 0.1 });

        mediaObserver.observe(mediaSection);
      }

      // --- Flip Card & Link Logic (Contact Section) ---
      const flipCards = document.querySelectorAll('.contact_card');

      flipCards.forEach(card => {
          if (card.querySelector('.flip_inner')) {
              card.addEventListener('click', function() {
                  // Check if the card is already flipped
                  if (this.classList.contains('is_flipped')) {
                      // If flipped, find the link and open it
                      const socialLink = this.querySelector('.social_link');
                      if (socialLink) {
                          const type = socialLink.getAttribute('data-type');
                          const id = socialLink.getAttribute('data-id');
                          
                          if (type === 'social') {
                              const platform = socialLink.getAttribute('data-platform');
                              const socialUrls = {
                                  github: `https://github.com/${id}`,
                                  linkedin: `https://linkedin.com/in/${id}`,
                                  instagram: `https://instagram.com/${id}`
                              };
                              window.open(socialUrls[platform], '_blank', 'noopener,noreferrer');
                          } else if (type === 'mail') {
                              const domain = socialLink.getAttribute('data-domain');
                              window.location.href = `mailto:${id}@${domain}`;
                          } else if (type === 'discord') {
                              window.open(`https://discord.com/users/${id}`, '_blank', 'noopener,noreferrer');
                          }
                      }
                  } else {
                      // If not flipped, just flip it
                      this.classList.add('is_flipped');
                  }
              });
              
              card.addEventListener('mouseleave', function() {
                  // Always flip back on mouse leave
                  this.classList.remove('is_flipped');
              });
          }
      });

      // --- Scroll Arrow Logic ---
      const scrollArrowContainer = document.getElementById('scroll_arrow_container');
      const footerPlaceholder = document.getElementById('footer_placeholder');
      const sections = document.querySelectorAll('.home_section, .about_section, .projects_section, .media_section, .contact_section');
      let currentSectionIndex = 0;
    if (scrollArrowContainer && sections.length > 0 && footerPlaceholder) {
        // Observer để theo dõi section nào đang hiển thị trên màn hình
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Tìm index của section đang hiển thị
                    const intersectingIndex = Array.from(sections).findIndex(sec => sec === entry.target);
                    if (intersectingIndex > -1) {
                        currentSectionIndex = intersectingIndex;
                    }
                }
            });
        }, { threshold: 0.5 }); // Kích hoạt khi 50% section hiện ra

        sections.forEach(section => sectionObserver.observe(section));

        // 1. Click event
        scrollArrowContainer.addEventListener('click', () => {
            if (scrollArrowContainer.classList.contains('scrolled_to_bottom')) {
                // Nếu ở cuối, cuộn lên đầu
                sections[0].scrollIntoView({ behavior: 'smooth' });
            } else {
                // Cuộn xuống section tiếp theo
                const nextSectionIndex = currentSectionIndex + 1;
                if (nextSectionIndex < sections.length) {
                    sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Nếu đã ở section cuối, cuộn tới footer
                    footerPlaceholder.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // 2. Observer để phát hiện khi tới footer
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                scrollArrowContainer.classList.toggle('scrolled_to_bottom', entry.isIntersecting);
            });
        }, { threshold: 0.1 });

        footerObserver.observe(footerPlaceholder);
    }
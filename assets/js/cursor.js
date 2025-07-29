var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function() {
        // Set up element sizes
        if (this.$dot && this.$outline) { // Add checks to ensure elements exist
            this.dotSize = this.$dot.offsetWidth;
            this.outlineSize = this.$outline.offsetWidth;

            this.setupEventListeners();
            this.animateDotOutline();
        } else {
            console.warn("Cursor elements not found. Custom cursor will not function.");
        }
    },

    setupEventListeners: function() {
        var self = this;

        // Anchor hovering (adjusting to target all clickable elements, not just 'a')
        document.querySelectorAll('a, button, .project-card, .social-icon').forEach(function(el) { // Added common clickable elements
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            if (self.$dot) {
                self.$dot.style.top = self.endY + 'px';
                self.$dot.style.left = self.endX + 'px';
            }
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            if (self.$dot) self.$dot.style.opacity = 1;
            if (self.$outline) self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            if (self.$dot) self.$dot.style.opacity = 0;
            if (self.$outline) self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function() {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        if (self.$outline) {
            self.$outline.style.top = self._y + 'px';
            self.$outline.style.left = self._x + 'px';
        }

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function() {
        var self = this;

        if (self.cursorEnlarged) {
            if (self.$dot) self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            if (self.$outline) self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            if (self.$dot) self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            if (self.$outline) self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function() {
        var self = this;

        if (self.cursorVisible) {
            if (self.$dot) self.$dot.style.opacity = 1;
            if (self.$outline) self.$outline.style.opacity = 1;
        } else {
            if (self.$dot) self.$dot.style.opacity = 0;
            if (self.$outline) self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();
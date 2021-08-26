module TimetablesHelper
    def iso_image(id)
        return image_tag 'hima.png', :width => '100%', :height => '100%', :id => id
    end

    def go_home_button
        return button_to "最初に戻る", {controller: 'timetables', action: 'index'}, {method: :get, params:{num1:'fromTM'},class: 'button third'}
    end

    def view_history_back
        return button_to "前の画面へ戻る", {controller: 'timetables', action: 'history'}, {method: :get, params:{num1:'fromTM'},class: 'button third'}
    end

end

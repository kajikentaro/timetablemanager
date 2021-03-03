module TimetablesHelper
    def iso_image(id)
        return image_tag 'hima.png', :width => '80', :height => '80', :id => id
    end

    def go_home_button
        return button_to "最初に戻る", {controller: 'timetables', action: 'home'}, {method: :get, params:{num1:'fromTM'},class: 'button full'}
    end

    def go_home_button_half
        return button_to "最初に戻る", {controller: 'timetables', action: 'home'}, {method: :get, params:{num1:'fromTM'},class: 'button half'}
    end

    def view_history_half
        return button_to "提出履歴を表示", {controller: 'timetables', action: 'home'}, {method: :get, params:{num1:'fromTM'},class: 'button half'}
    end

end

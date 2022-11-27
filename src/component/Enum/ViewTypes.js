class ViewTypes {

  static Edit = new ViewTypes("edit")
  static Fill = new ViewTypes("fill")
  static Statistics = new ViewTypes("statistics")
  static Share = new ViewTypes("share")

  constructor(name) {
    this.name = name
  }
}export default ViewTypes;
